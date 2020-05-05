import { takeLatest, put, all, call } from 'redux-saga/effects';
import { reduxSagaFirebase } from '../../config/firebase';
import firebase from '../../config/firebase';
import { closeModal } from '../modals/modal.actions';
import {
	EMAIL_SIGN_IN_START,
	REGISTER_START,
	SOCIAL_SIGN_IN_START,
} from './auth.types';
import {
	signInFailure,
	registerFailure,
	signInSuccess,
	registerSuccess,
} from './auth.actions';

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const user = yield call(
			reduxSagaFirebase.auth.signInWithEmailAndPassword,
			email,
			password
		);
		yield put(signInSuccess(user));
		yield put(closeModal());
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* registerUser({ payload: { email, password, displayName } }) {
	try {
		//create new User
		const { user } = yield call(
			reduxSagaFirebase.auth.createUserWithEmailAndPassword,
			email,
			password
		);

		//set user doc on firestore
		yield call(reduxSagaFirebase.firestore.setDocument, `users/${user.uid}`, {
			displayName: displayName,
			email: email,
			createdAt: new Date(),
		});
		yield put(registerSuccess(user));
		yield put(closeModal());
	} catch (error) {
		yield put(registerFailure(error));
	}
}

export function* onRegisterStart() {
	yield takeLatest(REGISTER_START, registerUser);
}

export function* socialSignIn({ payload: selectedProvider }) {
	yield put(closeModal());
	try {
		let authProvider;
		if (selectedProvider === 'google') {
			const googleProvider = new firebase.auth.GoogleAuthProvider();
			authProvider = googleProvider;
		} else if (selectedProvider === 'facebook') {
			const facebookProvider = new firebase.auth.FacebookAuthProvider();
			authProvider = facebookProvider;
		}
		const data = yield firebase.auth().signInWithPopup(authProvider);
		const { user } = data;
		//set user doc on firestore
		yield call(reduxSagaFirebase.firestore.setDocument, `users/${user.uid}`, {
			displayName: user.displayName,
			email: user.email,
			photoUrl: user.photoURL,
			createdAt: new Date(),
		});
		yield put(signInSuccess(user));
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onSocialSignInStart() {
	yield takeLatest(SOCIAL_SIGN_IN_START, socialSignIn);
}

export function* authSagas() {
	yield all([
		call(onEmailSignInStart),
		call(onRegisterStart),
		call(onSocialSignInStart),
	]);
}
