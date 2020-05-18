import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { firestore, auth } from '../../config/firebase';
import { toastr } from 'react-redux-toastr';
import { CREATE_EVENT } from './events.types';
import { createEventSuccess, createEventFailure } from './events.actions';
import { createNewEvent } from '../../utils/helpers';
import history from '../../history';

function* createEvent({ payload: { event } }) {
	const getState = yield select();
	const user = auth.currentUser;
	const photoURL = getState.firebase.profile.photoURL;
	const newEvent = createNewEvent(user, photoURL, event);
	console.log(event.date);
	try {
		let createdEvent = yield firestore.collection('events').add(newEvent);

		yield firestore
			.collection('/event_attendee')
			.doc(`/${createdEvent.id}_${user.uid}`)
			.set({
				eventId: createdEvent.id,
				userUid: user.uid,
				eventDate: event.date,
				isCreator: true,
			});
		yield put(createEventSuccess(event));
		history.push(`/event/${createdEvent.id}`);
		toastr.success('Success', 'Event has been created');
	} catch (error) {
		yield put(createEventFailure(error));
		toastr.error('Oops', 'Something went wrong');
	}
}

function* onCreateEvent() {
	yield takeLatest(CREATE_EVENT, createEvent);
}

export function* eventSagas() {
	yield all([call(onCreateEvent)]);
}
