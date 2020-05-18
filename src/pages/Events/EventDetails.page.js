import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore, useFirestoreConnect } from 'react-redux-firebase';

import EventDetailInfo from '../../components/Events/EventDetails/EventDetailInfo';

const EventDetailPage = ({ event }) => {
	useFirestoreConnect('events');
	return <EventDetailInfo event={event} />;
};

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;
	let event = {};

	if (
		eventId &&
		state.firestore.ordered.events &&
		state.firestore.ordered.events.length > 0
	) {
		event = state.firestore.ordered.events.filter(
			(event) => event.id === eventId
		)[0];
	}

	return {
		event,
	};
};

export default withFirestore(connect(mapStateToProps)(EventDetailPage));
