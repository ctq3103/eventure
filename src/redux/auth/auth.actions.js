import {
	SOCIAL_SIGN_IN_START,
	SIGN_IN_SUCCESS,
	EMAIL_SIGN_IN_START,
	SIGN_IN_FAILURE,
	REGISTER_START,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
} from './auth.types';

export const emailSignInStart = (user) => ({
	type: EMAIL_SIGN_IN_START,
	payload: user,
});

export const socialSignInStart = (selectedProvider) => ({
	type: SOCIAL_SIGN_IN_START,
	payload: selectedProvider,
});

export const signInSuccess = (user) => {
	return {
		type: SIGN_IN_SUCCESS,
		payload: user,
	};
};

export const signInFailure = (error) => {
	return {
		type: SIGN_IN_FAILURE,
		payload: error,
	};
};

export const registerStart = (user) => {
	return {
		type: REGISTER_START,
		payload: user,
	};
};

export const registerSuccess = (user) => {
	return {
		type: REGISTER_SUCCESS,
		payload: user,
	};
};

export const registerFailure = (error) => {
	return {
		type: REGISTER_FAILURE,
		payload: error,
	};
};
