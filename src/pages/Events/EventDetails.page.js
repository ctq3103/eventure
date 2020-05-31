import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore, isLoaded } from 'react-redux-firebase';
import EventDetailInfo from '../../components/Events/EventDetails/EventDetailInfo';
import { joinEvent, cancelJoinEvent } from '../../redux/user/user.actions';
import {
	addToFavorites,
	removeFromFavorites,
	getUserFavorites,
} from '../../redux/favorite/favorite.actions';
import { objectToArray } from '../../utils/helpers';
import Loading from '../../components/Loading';
import { openModal } from '../../redux/modals/modal.actions';

class EventDetailPage extends Component {
	componentDidMount() {
		const { firestore, match, auth, getUserFavorites } = this.props;
		firestore.setListener(`events/${match.params.id}`);
		getUserFavorites(auth.uid);
	}

	componentWillUnmount() {
		const { firestore, match } = this.props;
		firestore.unsetListener(`events/${match.params.id}`);
	}

	render() {
		const {
			events,
			event,
			auth,
			joinEvent,
			cancelJoinEvent,
			addToFavorites,
			removeFromFavorites,
			requesting,
			openModal,
			dispatch,
		} = this.props;

		const loading = Object.values(requesting).some((item) => item === true);

		if (!isLoaded(events) || !isLoaded(auth) || loading) return <Loading />;

		const attendees =
			event && event.attendees && objectToArray(event.attendees);
		const favorites =
			event && event.favorites && objectToArray(event.favorites);

		const isCreator = event.creatorUid === auth.uid;
		const isAttendee =
			attendees && attendees.some((user) => user.id === auth.uid);
		const isInFavorites =
			favorites && favorites.some((user) => user.id === auth.uid);
		const authenticated = auth.isLoaded && !auth.isEmpty;

		return (
			<EventDetailInfo
				event={event}
				attendees={attendees}
				isCreator={isCreator}
				joinEvent={joinEvent}
				cancelJoinEvent={cancelJoinEvent}
				addToFavorites={addToFavorites}
				removeFromFavorites={removeFromFavorites}
				isAttendee={isAttendee}
				isInFavorites={isInFavorites}
				authenticated={authenticated}
				openModal={openModal}
				dispatch={dispatch}
			/>
		);
	}
}

const mapDispatchToProps = {
	joinEvent,
	cancelJoinEvent,
	addToFavorites,
	removeFromFavorites,
	getUserFavorites,
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
		events: state.firestore.ordered.events,
		auth: state.firebase.auth,
		requesting: state.firestore.status.requesting,
	};
};

export default withFirestore(
	connect(mapStateToProps, mapDispatchToProps)(EventDetailPage)
);
