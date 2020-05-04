import {combineReducers} from 'redux';
import { reducer as FormReducer} from 'redux-form';
import { reducer as ToastrReducer} from 'react-redux-toastr';
import { modalReducer } from './modals/modal.reducer';
import { authReducer } from './auth/auth.reducer';
import { firebaseReducer} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form: FormReducer,
    modal: modalReducer,
    auth: authReducer,
    toastr: ToastrReducer
})

export default rootReducer;