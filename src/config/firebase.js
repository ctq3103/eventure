import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBf7THB5uL7B4TjZoqZx692t7UiRALY_Ao',
	authDomain: 'eventure-c9ac0.firebaseapp.com',
	databaseURL: 'https://eventure-c9ac0.firebaseio.com',
	projectId: 'eventure-c9ac0',
	storageBucket: 'eventure-c9ac0.appspot.com',
	messagingSenderId: '519525770881',
	appId: '1:519525770881:web:0e3d135ad5ad0229238f80',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
