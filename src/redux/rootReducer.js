import {combineReducers} from 'redux';
import { reducer as FormReducer} from 'redux-form';
import { modalReducer } from './modals/modal.reducer';
import { authReducer } from './auth/auth.reducer';

const rootReducer = combineReducers({
    form: FormReducer,
    modal: modalReducer,
    auth: authReducer
})

export default rootReducer;