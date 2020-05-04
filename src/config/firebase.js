import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBf7THB5uL7B4TjZoqZx692t7UiRALY_Ao',
	authDomain: 'eventure-c9ac0.firebaseapp.com',
	databaseURL: 'https://eventure-c9ac0.firebaseio.com',
	projectId: 'eventure-c9ac0',
	storageBucket: 'eventure-c9ac0.appspot.com',
	messagingSenderId: '519525770881',
	appId: '1:519525770881:web:0e3d135ad5ad0229238f80',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	//check if userAuth object is not exist (user signout)
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userRef;
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};

// Initialize Firebase
const myFirebaseApp = firebase.initializeApp(firebaseConfig);
export const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
