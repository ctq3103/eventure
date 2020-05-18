import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth, firestore } from '../../config/firebase';
import { reset } from 'redux-form';
import firebase from '../../config/firebase';
import { toastr } from 'react-redux-toastr';
import { closeModal } from '../modals/modal.actions';
import {
	EMAIL_SIGN_IN_START,
	REGISTER_START,
	SOCIAL_SIGN_IN_START,
	UPDATE_PASSWORD_START,
} from './auth.types';
import {
	signInFailure,
	registerFailure,
	signInSuccess,
	registerSuccess,
	updatePasswordSuccess,
	updatePasswordFailure,
} from './auth.actions';

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const user = yield auth.signInWithEmailAndPassword(email, password);
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
		const user = yield auth.createUserWithEmailAndPassword(email, password);

		yield user.user.updateProfile({
			displayName: displayName,
		});

		let newUser = {
			displayName: displayName,
			email: email,
			createdAt: new Date(),
		};

		yield firestore
			.collection('users')
			.doc(`${user.user.uid}`)
			.set({ ...newUser });

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
		const data = yield auth.signInWithPopup(authProvider);
		const {
			user,
			additionalUserInfo: { isNewUser },
		} = data;

		if (isNewUser) {
			//set user doc on firestore
			yield firestore.collection('users').doc(`${user.uid}`).set({
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				createdAt: new Date(),
			});
		}

		yield put(signInSuccess(user));
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onSocialSignInStart() {
	yield takeLatest(SOCIAL_SIGN_IN_START, socialSignIn);
}

export function* updatePassword({ payload: user }) {
	const currentUser = auth.currentUser;
	try {
		yield currentUser.updatePassword(user.password);

		toastr.success('Success', 'Your password has been updated');
		yield put(updatePasswordSuccess(user));
		yield put(reset('account'));
	} catch (error) {
		yield put(updatePasswordFailure(error));
	}
}

export function* onUpdatePasswordStart() {
	yield takeLatest(UPDATE_PASSWORD_START, updatePassword);
}

export function* authSagas() {
	yield all([
		call(onEmailSignInStart),
		call(onRegisterStart),
		call(onSocialSignInStart),
		call(onUpdatePasswordStart),
	]);
}
