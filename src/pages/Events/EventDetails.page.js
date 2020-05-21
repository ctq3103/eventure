import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import EventDetailInfo from '../../components/Events/EventDetails/EventDetailInfo';
import { joinEvent, cancelJoinEvent } from '../../redux/user/user.actions';
import { objectToArray } from '../../utils/helpers';
import { openModal } from '../../redux/modals/modal.actions';

class EventDetailPage extends Component {
	componentDidMount() {
		const { firestore, match } = this.props;
		firestore.setListener(`events/${match.params.id}`);
	}

	componentWillUnmount() {
		const { firestore, match } = this.props;
		firestore.unsetListener(`events/${match.params.id}`);
	}

	render() {
		const { event, auth, joinEvent, cancelJoinEvent, openModal } = this.props;
		const attendees =
			event && event.attendees && objectToArray(event.attendees);

		const isCreator = event.creatorUid === auth.uid;
		const isAttendee =
			attendees && attendees.some((user) => user.id === auth.uid);

		return (
			<EventDetailInfo
				event={event}
				attendees={attendees}
				isCreator={isCreator}
				joinEvent={joinEvent}
				cancelJoinEvent={cancelJoinEvent}
				isAttendee={isAttendee}
				openModal={openModal}
			/>
		);
	}
}

const mapDispatchToProps = {
	joinEvent,
	cancelJoinEvent,
	openModal,
};

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;
	let event = {};

	if (
		eventId &&
		state.firestore.ordered.events &&
		state.firestore.ordered.events.length > 0
	) {
		event =
			state.firestore.ordered.events.filter(
				(event) => event.id === eventId
			)[0] || {};
	}

	return {
		event,
		auth: state.firebase.auth,
	};
};

export default withFirestore(
	connect(mapStateToProps, mapDispatchToProps)(EventDetailPage)
);
