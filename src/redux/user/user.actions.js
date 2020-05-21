import {
	UPDATE_PROFILE,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAILURE,
	UPLOAD_PHOTO,
	UPLOAD_PHOTO_FAILURE,
	UPLOAD_PHOTO_SUCCESS,
	DELETE_PHOTO,
	DELETE_PHOTO_SUCCESS,
	DELETE_PHOTO_FAILURE,
	SET_PROFILE_PHOTO,
	SET_PROFILE_PHOTO_SUCCESS,
	SET_PROFILE_PHOTO_FAILURE,
	JOIN_EVENT,
	JOIN_EVENT_SUCCESS,
	JOIN_EVENT_FAILURE,
	CANCEL_JOIN_EVENT,
	CANCEL_JOIN_EVENT_SUCCESS,
	CANCEL_JOIN_EVENT_FAILURE,
} from './user.types';

export const updateProfile = (user) => {
	return {
		type: UPDATE_PROFILE,
		payload: user,
	};
};

export const updateProfileSuccess = (user) => {
	return {
		type: UPDATE_PROFILE_SUCCESS,
		payload: user,
	};
};

export const updateProfileFailure = (error) => {
	return {
		type: UPDATE_PROFILE_FAILURE,
		payload: error,
	};
};

export const uploadPhoto = (file, fileName) => {
	return {
		type: UPLOAD_PHOTO,
		payload: { file, fileName },
	};
};

export const uploadPhotoSuccess = (file, fileName) => {
	return {
		type: UPLOAD_PHOTO_SUCCESS,
		payload: { file, fileName },
	};
};

export const uploadPhotoFailure = (error) => {
	return {
		type: UPLOAD_PHOTO_FAILURE,
		payload: error,
	};
};

export const deletePhoto = (photo) => {
	return {
		type: DELETE_PHOTO,
		payload: { photo },
	};
};

export const deletePhotoSuccess = (photo) => {
	return {
		type: DELETE_PHOTO_SUCCESS,
		payload: { photo },
	};
};

export const deletePhotoFailure = (error) => {
	return {
		type: DELETE_PHOTO_FAILURE,
		payload: error,
	};
};

export const setProfilePhoto = (photo) => {
	return {
		type: SET_PROFILE_PHOTO,
		payload: { photo },
	};
};

export const setProfilePhotoSuccess = (photo) => {
	return {
		type: SET_PROFILE_PHOTO_SUCCESS,
		payload: { photo },
	};
};

export const setProfilePhotoFailure = (error) => {
	return {
		type: SET_PROFILE_PHOTO_FAILURE,
		payload: error,
	};
};

export const joinEvent = (event) => {
	return {
		type: JOIN_EVENT,
		payload: { event },
	};
};

export const joinEventSuccess = (event) => {
	return {
		type: JOIN_EVENT_SUCCESS,
		payload: { event },
	};
};

export const joinEventFailure = (error) => {
	return {
		type: JOIN_EVENT_FAILURE,
		payload: error,
	};
};

export const cancelJoinEvent = (event) => {
	return {
		type: CANCEL_JOIN_EVENT,
		payload: { event },
	};
};

export const cancelJoinEventSuccess = (event) => {
	return {
		type: CANCEL_JOIN_EVENT_SUCCESS,
		payload: { event },
	};
};

export const cancelJoinEventFailure = (error) => {
	return {
		type: CANCEL_JOIN_EVENT_FAILURE,
		payload: error,
	};
};
