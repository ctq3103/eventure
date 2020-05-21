import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { firestore, auth } from '../../config/firebase';
import { toastr } from 'react-redux-toastr';
import { CREATE_EVENT, UPDATE_EVENT, CANCEL_TOGGLE } from './events.types';
import {
	createEventSuccess,
	createEventFailure,
	updateEventSuccess,
	updateEventFailure,
	cancelToggleSuccess,
	cancelToggleFailure,
} from './events.actions';
import { createNewEvent } from '../../utils/helpers';
import history from '../../history';

function* createEvent({ payload: { event } }) {
	const getState = yield select();
	const user = auth.currentUser;
	const photoURL = getState.firebase.profile.photoURL;
	const newEvent = createNewEvent(user, photoURL, event);
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

function* updateEvent({ payload: { event } }) {
	try {
		yield firestore.collection('events').doc(`${event.id}`).update(event);
		yield put(updateEventSuccess(event));
		history.push(`/event/${event.id}`);
		toastr.success('Success', 'Event has been updated');
	} catch (error) {
		yield put(updateEventFailure(error));
		toastr.error('Oops', 'Something went wrong');
	}
}

function* onUpdateEvent() {
	yield takeLatest(UPDATE_EVENT, updateEvent);
}

function* cancelToggle({ payload: { cancelled, eventId } }) {
	const message = cancelled
		? 'Cancel this event now?'
		: 'Reactivate this event now?';

	try {
		yield toastr.confirm(message, {
			onOk: () =>
				firestore
					.collection('events')
					.doc(`${eventId}`)
					.update({ cancelled: cancelled }),
		});

		yield put(cancelToggleSuccess(cancelled, eventId));
	} catch (error) {
		console.log(error);
		yield put(cancelToggleFailure(error));
	}
}

function* onCancelToggle() {
	yield takeLatest(CANCEL_TOGGLE, cancelToggle);
}

export function* eventSagas() {
	yield all([call(onCreateEvent), call(onUpdateEvent), call(onCancelToggle)]);
}
