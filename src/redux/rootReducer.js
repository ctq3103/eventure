import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { modalReducer } from './modals/modal.reducer';
import { authReducer } from './auth/auth.reducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { favoriteItemReducer } from './favorite/favorite.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whiteList: ['favorite'],
};

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	form: FormReducer,
	modal: modalReducer,
	auth: authReducer,
	toastr: ToastrReducer,
	favorite: favoriteItemReducer,
});

export default persistReducer(persistConfig, rootReducer);
