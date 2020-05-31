import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { modalReducer } from './modals/modal.reducer';
import { authReducer } from './auth/auth.reducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { favoritesReducer } from './favorite/favorite.reducer';
import { asyncReducer } from './async/async.reducer';
import { eventsReducer } from './events/events.reducer';

const persistConfig = {
	key: 'root',
	storage,
	//whiteList: ['favorites'],
};

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	form: FormReducer,
	modal: modalReducer,
	auth: authReducer,
	toastr: ToastrReducer,
	favorites: favoritesReducer,
	async: asyncReducer,
	events: eventsReducer,
});

export default persistReducer(persistConfig, rootReducer);
