import {
	SIGN_IN_SUCCESS,
	SIGN_IN_FAILURE,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	UPDATE_PASSWORD_FAILURE,
} from './auth.types';

const INITIAL_STATE = {
	authenticated: false,
	currentUser: null,
	error: null,
	accError: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN_SUCCESS:
		case REGISTER_SUCCESS:
			return {
				...state,
				authenticated: true,
				currentUser: action.payload,
			};
		case SIGN_IN_FAILURE:
		case REGISTER_FAILURE:
			return {
				...state,
				error: action.payload,
			};
		case UPDATE_PASSWORD_FAILURE:
			return {
				...state,
				accError: action.payload,
			};

		default:
			return state;
	}
};
