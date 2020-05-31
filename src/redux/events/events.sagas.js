import {
	takeLatest,
	takeEvery,
	put,
	all,
	call,
	select,
} from 'redux-saga/effects';
import firebase, { firestore, auth } from '../../config/firebase';
import { toastr } from 'react-redux-toastr';
import {
	CREATE_EVENT,
	UPDATE_EVENT,
	CANCEL_TOGGLE,
	UPLOAD_EVENT_IMAGE,
	FETCH_EVENTS,
	GET_NEXT_EVENTS,
} from './events.types';
import {
	createEventSuccess,
	createEventFailure,
	updateEventSuccess,
	updateEventFailure,
	cancelToggleSuccess,
	cancelToggleFailure,
	uploadEventImageSuccess,
	uploadEventImageFailure,
	fetchEventsSuccess,
	fetchEventsFailure,
	getNextEventsSuccess,
	getNextEventsFailure,
} from './events.actions';
import { createNewEvent } from '../../utils/helpers';
import history from '../../history';
import {
	asyncActionStart,
	asyncActionFinish,
	asyncActionError,
} from '../async/async.actions';

function* fetchEvents({ payload: { moreEvents } }) {
	const today = new Date();
	const eventsRef = yield firestore.collection('events');

	try {
		yield put(asyncActionStart());

		let query = yield eventsRef
			.where('date', '>=', today)
			.orderBy('date')
			.limit(12);

		let querySnapshot = yield query.get();

		let events = [];
		for (let i = 0; i < querySnapshot.docs.length; i++) {
			let evt = {
				...querySnapshot.docs[i].data(),
				id: querySnapshot.docs[i].id,
			};
			events.push(evt);
		}

		if (events.length <= 11) {
			moreEvents = false;
		} else {
			moreEvents = true;
		}

		yield put(fetchEventsSuccess(events, moreEvents));
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(fetchEventsFailure(error));
		yield put(asyncActionError());
	}
}

function* onFetchEvents() {
	yield takeEvery(FETCH_EVENTS, fetchEvents);
}

function* getNextEvents({ payload: { lastEvent, moreEvents } }) {
	const today = new Date();
	const eventsRef = yield firestore.collection('events');

	try {
		yield put(asyncActionStart());

		//if there is lastEvent, get doc of lastEvent, query document from the last event

		let startAfter = yield firestore
			.collection('events')
			.doc(lastEvent.id)
			.get();
		let query = eventsRef
			.where('date', '>=', today)
			.orderBy('date')
			.startAfter(startAfter)
			.limit(12);

		let querySnapshot = yield query.get();

		// if (querySnapshot.docs.length <= 1) {
		// 	moreEvents = false;
		// 	yield put(getNextEventsSuccess(moreEvents));
		// 	yield put(asyncActionFinish());
		// 	return;
		// }

		let events = [];
		for (let i = 0; i < querySnapshot.docs.length; i++) {
			let evt = {
				...querySnapshot.docs[i].data(),
				id: querySnapshot.docs[i].id,
			};
			events.push(evt);
		}

		if (events.length <= 11) {
			moreEvents = false;
		} else {
			moreEvents = true;
		}

		yield put(getNextEventsSuccess(events, moreEvents));
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(getNextEventsFailure(error));
		yield put(asyncActionError());
	}
}

function* onGetNextEvents() {
	yield takeEvery(GET_NEXT_EVENTS, getNextEvents);
}

function* createEvent({ payload: { event } }) {
	const getState = yield select();
	const user = auth.currentUser;
	const photoURL = getState.firebase.profile.photoURL;
	const newEvent = yield createNewEvent(user, photoURL, event);
	try {
		yield put(asyncActionStart());
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
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(createEventFailure(error));
		toastr.error('Oops', 'Something went wrong');
		yield put(asyncActionError());
	}
}

function* onCreateEvent() {
	yield takeLatest(CREATE_EVENT, createEvent);
}

function* updateEvent({ payload: { event } }) {
	try {
		yield put(asyncActionStart());
		yield firestore.collection('events').doc(`${event.id}`).update(event);
		yield put(updateEventSuccess(event));
		history.push(`/event/${event.id}`);
		toastr.success('Success', 'Event has been updated');
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(updateEventFailure(error));
		toastr.error('Oops', 'Something went wrong');
		yield put(asyncActionError());
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
		yield put(asyncActionStart());
		yield toastr.confirm(message, {
			onOk: () =>
				firestore
					.collection('events')
					.doc(`${eventId}`)
					.update({ cancelled: cancelled }),
		});

		yield put(cancelToggleSuccess(cancelled, eventId));
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(cancelToggleFailure(error));
	}
}

function* onCancelToggle() {
	yield takeLatest(CANCEL_TOGGLE, cancelToggle);
}

function* uploadEventImage({ payload: { file, fileName, eventId } }) {
	const user = auth.currentUser;
	const path = `${user.uid}/event_images`;
	const options = {
		name: fileName,
	};

	try {
		yield put(asyncActionStart());

		//upload file to firebase storage
		let uploadedFile = yield firebase.uploadFile(path, file, null, options);
		//get URL of image
		let downloadURL = yield uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

		yield firestore.collection('events').doc(`${eventId}`).update({
			imageURL: downloadURL,
		});
		yield put(uploadEventImageSuccess(file, fileName, eventId));
		history.push(`/event/${eventId}`);
		toastr.success('Success', 'Event image has been uploaded');
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(uploadEventImageFailure(error));
		toastr.error('Oops', 'Something went wrong');
		yield put(asyncActionError());
	}
}

function* onUploadEventImage() {
	yield takeLatest(UPLOAD_EVENT_IMAGE, uploadEventImage);
}

export function* eventSagas() {
	yield all([
		call(onCreateEvent),
		call(onUpdateEvent),
		call(onCancelToggle),
		call(onUploadEventImage),
		call(onFetchEvents),
		call(onGetNextEvents),
	]);
}
