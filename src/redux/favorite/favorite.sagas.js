import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import firebase, { firestore, auth } from '../../config/firebase';
import { toastr } from 'react-redux-toastr';
import {
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
	GET_USER_FAVORITES,
} from './favorite.types';
import {
	getUserFavoritesFailure,
	getUserFavoritesSuccess,
	addToFavoritesSuccess,
	addToFavoritesFailure,
	removeFromFavoritesSuccess,
	removeFromFavoritesFailure,
} from './favorite.actions';
import {
	asyncActionStart,
	asyncActionFinish,
	asyncActionError,
} from '../async/async.actions';

function* addToFavorites({ payload: { event } }) {
	const getState = yield select();
	const user = auth.currentUser;
	const profile = getState.firebase.profile;
	const favorite = {
		name: profile.displayName,
		photoURL: profile.photoURL,
	};
	try {
		yield put(asyncActionStart());
		yield firestore
			.collection('events')
			.doc(`${event.id}`)
			.update({
				[`favorites.${user.uid}`]: favorite,
			});
		yield firestore
			.collection('in_favorites')
			.doc(`${event.id}_${user.uid}`)
			.set({
				eventDate: event.date,
				eventId: event.id,
				userUid: user.uid,
			});
		yield put(addToFavoritesSuccess(event));
		toastr.success('Success', 'Add this event to Favorites successfully!');
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(addToFavoritesFailure(error));
		toastr.error('Oops', 'Something went wrong!');
		yield put(asyncActionError());
	}
}

function* onAddToFavorites() {
	yield takeLatest(ADD_TO_FAVORITES, addToFavorites);
}

function* removeFromFavorites({ payload: { event } }) {
	const user = auth.currentUser;

	try {
		yield firestore
			.collection('events')
			.doc(`${event.id}`)
			.update({
				[`favorites.${user.uid}`]: firebase.firestore.FieldValue.delete(),
			});
		yield firestore
			.collection('in_favorites')
			.doc(`${event.id}_${user.uid}`)
			.delete();
		yield put(removeFromFavoritesSuccess(event));
		toastr.success('Ok!', 'Event has been removed from favorite list');
	} catch (error) {
		yield put(removeFromFavoritesFailure(error));
		toastr.error('Oops', 'Something went wrong!');
		yield put(asyncActionError());
	}
}

function* onRemoveFromFavorites() {
	yield takeLatest(REMOVE_FROM_FAVORITES, removeFromFavorites);
}

function* getUserFavorites({ payload: { userUid } }) {
	let favoritesRef = firestore.collection('in_favorites');

	let query = yield favoritesRef
		.where('userUid', '==', userUid)
		.orderBy('eventDate', 'desc');

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

		yield put(getUserFavoritesSuccess(events));
		yield put(asyncActionFinish());
	} catch (error) {
		yield put(getUserFavoritesFailure(error));
		yield put(asyncActionError());
	}
}

function* onGetUserFavorites() {
	yield takeLatest(GET_USER_FAVORITES, getUserFavorites);
}

export function* favoriteSagas() {
	yield all([
		call(onAddToFavorites),
		call(onRemoveFromFavorites),
		call(onGetUserFavorites),
	]);
}
