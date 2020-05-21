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
} from './user.actions';

function* updateProfile({ payload: user }) {
	try {
		yield call(firebase.updateProfile, user);
		yield put(updateProfileSuccess(user));
		toastr.success('Success', 'Your profile has been updated');
	} catch (error) {
		yield put(updateProfileFailure(error));
		toastr.error('Error', 'There is somethign wrong!');
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
	} catch (error) {
		console.log(error);
		yield put(uploadPhotoFailure(error));
	}
}

function* onUploadPhoto() {
	yield takeLatest(UPLOAD_PHOTO, uploadPhoto);
}

function* deletePhoto({ payload: { photo } }) {
	const user = auth.currentUser;
	try {
		yield firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
		yield firestore.doc(`users/${user.uid}/photos/${photo.id}`).delete();
		yield put(deletePhotoSuccess(photo));
		toastr.success('Success', 'Photo has been deleted');
	} catch (error) {
		yield put(deletePhotoFailure(error));
		toastr.error('Error', 'Problem deleting photo');
	}
}

function* onDeletePhoto() {
	yield takeLatest(DELETE_PHOTO, deletePhoto);
}

function* setProfilePhoto({ payload: { photo } }) {
	try {
		yield firebase.updateProfile({
			photoURL: photo.url,
		});
		yield put(setProfilePhotoSuccess(photo));
		toastr.success('Success', 'Profile picture has been set');
	} catch (error) {
		yield put(setProfilePhotoFailure(error));
		toastr.error('Error', 'Problem setting profile picture');
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
	} catch (error) {
		yield put(joinEventFailure(error));
		toastr.error('Oops', 'Something went wrong!');
	}
}

function* onJoinEvent() {
	yield takeLatest(JOIN_EVENT, joinEvent);
}

function* cancelJoinEvent({ payload: { event } }) {
	const user = auth.currentUser;

	try {
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
	} catch (error) {
		yield put(cancelJoinEventFailure(error));
		toastr.error('Oops', 'Something went wrong!');
	}
}

function* onCancelJoinEvent() {
	yield takeLatest(CANCEL_JOIN_EVENT, cancelJoinEvent);
}

export function* userSagas() {
	yield all([
		call(onUpdateProfile),
		call(onUploadPhoto),
		call(onDeletePhoto),
		call(onSetProfilePhoto),
		call(onJoinEvent),
		call(onCancelJoinEvent),
	]);
}
