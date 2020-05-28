import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import cuid from 'cuid';
import firebase, { firestore, auth } from '../../config/firebase';
import { toastr } from 'react-redux-toastr';
import {
	UPDATE_PROFILE,
	UPLOAD_PHOTO,
	DELETE_PHOTO,
	SET_PROFILE_PHOTO,
	JOIN_EVENT,
	CANCEL_JOIN_EVENT,
	GET_USER_EVENTS,
} from './user.types';
import {
	updateProfileSuccess,
	updateProfileFailure,
	uploadPhotoSuccess,
	uploadPhotoFailure,
	deletePhotoSuccess,
	deletePhotoFailure,
	setProfilePhotoFailure,
	setProfilePhotoSuccess,
	joinEventSuccess,
	joinEventFailure,
	cancelJoinEventSuccess,
	cancelJoinEventFailure,
	getUserEventsFailure,
	getUserEventsSuccess,
} from './user.actions';
import {
	asyncActionStart,
	asyncActionFinish,
	asyncActionError,
} from '../async/async.actions';
import { fetchEventsSuccess } from '../events/events.actions';

function* updateProfile({ payload: user }) {
	try {
		yield put(asyncActionStart());
		yield call(firebase.updateProfile, user);
		yield put(updateProfileSuccess(user));
		toastr.success('Success', 'Your profile has been updated');
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(updateProfileFailure(error));
		toastr.error('Error', 'There is somethign wrong!');
		yield put(asyncActionError());
	}
}

function* onUpdateProfile() {
	yield takeLatest(UPDATE_PROFILE, updateProfile);
}

function* uploadPhoto({ payload: { file, fileName } }) {
	const user = auth.currentUser;
	const path = `${user.uid}/user_images`;
	const imageName = cuid();
	const options = {
		name: imageName,
	};

	try {
		yield put(asyncActionStart());
		//upload file to firebase storage
		let uploadedFile = yield firebase.uploadFile(path, file, null, options);
		//get URL of image
		let downloadURL = yield uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
		//get userDoc
		let userDoc = yield firestore.collection('users').doc(`${user.uid}`).get();

		//check if user has photo, if not update profile
		if (!userDoc.data().photoURL) {
			//update to firestore
			yield firebase.updateProfile({
				photoURL: downloadURL,
			});
			//update to firebase auth obj
			yield user.updateProfile({
				photoURL: downloadURL,
			});
		}

		//add the image to firestore

		yield firestore
			.collection('users')
			.doc(`${user.uid}`)
			.collection('photos')
			.add({
				name: imageName,
				url: downloadURL,
			});

		yield put(uploadPhotoSuccess(file, fileName));
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(uploadPhotoFailure(error));
		yield put(asyncActionError());
	}
}

function* onUploadPhoto() {
	yield takeLatest(UPLOAD_PHOTO, uploadPhoto);
}

function* deletePhoto({ payload: { photo } }) {
	const user = auth.currentUser;
	try {
		yield put(asyncActionStart());
		yield firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
		yield firestore.doc(`users/${user.uid}/photos/${photo.id}`).delete();
		yield put(deletePhotoSuccess(photo));
		toastr.success('Success', 'Photo has been deleted');
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(deletePhotoFailure(error));
		toastr.error('Error', 'Problem deleting photo');
		yield put(asyncActionError());
	}
}

function* onDeletePhoto() {
	yield takeLatest(DELETE_PHOTO, deletePhoto);
}

function* setProfilePhoto({ payload: { photo } }) {
	try {
		yield put(asyncActionStart());
		yield firebase.updateProfile({
			photoURL: photo.url,
		});
		yield put(setProfilePhotoSuccess(photo));
		toastr.success('Success', 'Profile picture has been set');
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(setProfilePhotoFailure(error));
		toastr.error('Error', 'Problem setting profile picture');
		yield put(asyncActionError());
	}
}

function* onSetProfilePhoto() {
	yield takeLatest(SET_PROFILE_PHOTO, setProfilePhoto);
}

function* joinEvent({ payload: { event } }) {
	const getState = yield select();
	const user = auth.currentUser;
	const profile = getState.firebase.profile;
	const attendee = {
		going: true,
		isCreator: false,
		joinDate: new Date(),
		name: profile.displayName,
		photoURL: profile.photoURL,
	};
	try {
		yield put(asyncActionStart());
		yield firestore
			.collection('events')
			.doc(`${event.id}`)
			.update({
				[`attendees.${user.uid}`]: attendee,
			});
		yield firestore
			.collection('event_attendee')
			.doc(`${event.id}_${user.uid}`)
			.set({
				eventDate: event.date,
				eventId: event.id,
				isCreator: false,
				userUid: user.uid,
			});
		yield put(joinEventSuccess(event));
		toastr.success('Welcome', 'Join event successfully!');
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(joinEventFailure(error));
		toastr.error('Oops', 'Something went wrong!');
		yield put(asyncActionError());
	}
}

function* onJoinEvent() {
	yield takeLatest(JOIN_EVENT, joinEvent);
}

function* cancelJoinEvent({ payload: { event } }) {
	const user = auth.currentUser;

	try {
		yield put(asyncActionStart());
		yield firestore
			.collection('events')
			.doc(`${event.id}`)
			.update({
				[`attendees.${user.uid}`]: firebase.firestore.FieldValue.delete(),
			});
		yield firestore
			.collection('event_attendee')
			.doc(`${event.id}_${user.uid}`)
			.delete();
		yield put(cancelJoinEventSuccess(event));
		toastr.success('Bye bye!', 'Take care and come back another time!');
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(cancelJoinEventFailure(error));
		toastr.error('Oops', 'Something went wrong!');
		yield put(asyncActionError());
	}
}

function* onCancelJoinEvent() {
	yield takeLatest(CANCEL_JOIN_EVENT, cancelJoinEvent);
}

function* getUserEvents({ payload: { userUid, activeTab } }) {
	const today = new Date();
	let eventsRef = firestore.collection('event_attendee');

	let query;
	switch (activeTab) {
		case 1: //past events
			query = yield eventsRef
				.where('userUid', '==', userUid)
				.where('eventDate', '<=', today)
				.orderBy('eventDate', 'desc');
			break;
		case 2: //future events
			query = yield eventsRef
				.where('userUid', '==', userUid)
				.where('eventDate', '>=', today)
				.orderBy('eventDate');
			break;
		case 3: //future events
			query = yield eventsRef
				.where('userUid', '==', userUid)
				.where('isCreator', '==', true)
				.orderBy('eventDate', 'desc');
			break;
		default:
			query = yield eventsRef
				.where('userUid', '==', userUid)
				.orderBy('eventDate', 'desc');
	}
	try {
		yield put(asyncActionStart());
		let querySnapshot = yield query.get();
		let events = [];

		for (let i = 0; i < querySnapshot.docs.length; i++) {
			let evt = yield firestore
				.collection('events')
				.doc(querySnapshot.docs[i].data().eventId)
				.get();
			events.push({ ...evt.data(), id: evt.id });
		}

		yield put(fetchEventsSuccess(events));
		yield put(getUserEventsSuccess(userUid, activeTab));
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(getUserEventsFailure(error));
		yield put(asyncActionError());
	}
}

function* onGetUserEvents() {
	yield takeLatest(GET_USER_EVENTS, getUserEvents);
}

export function* userSagas() {
	yield all([
		call(onUpdateProfile),
		call(onUploadPhoto),
		call(onDeletePhoto),
		call(onSetProfilePhoto),
		call(onJoinEvent),
		call(onCancelJoinEvent),
		call(onGetUserEvents),
	]);
}
