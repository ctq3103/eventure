import {
	ADD_TO_FAVORITES,
	ADD_TO_FAVORITES_SUCCESS,
	ADD_TO_FAVORITES_FAILURE,
	REMOVE_FROM_FAVORITES_SUCCESS,
	REMOVE_FROM_FAVORITES_FAILURE,
	GET_USER_FAVORITES,
	GET_USER_FAVORITES_SUCCESS,
	REMOVE_FROM_FAVORITES,
	GET_USER_FAVORITES_FAILURE,
} from './favorite.types';

export const addToFavorites = (event) => {
	return {
		type: ADD_TO_FAVORITES,
		payload: { event },
	};
};

export const addToFavoritesSuccess = (event) => {
	return {
		type: ADD_TO_FAVORITES_SUCCESS,
		payload: { event },
	};
};

export const addToFavoritesFailure = (error) => {
	return {
		type: ADD_TO_FAVORITES_FAILURE,
		payload: error,
	};
};

export const removeFromFavorites = (event) => {
	return {
		type: REMOVE_FROM_FAVORITES,
		payload: { event },
	};
};

export const removeFromFavoritesSuccess = (event) => {
	return {
		type: REMOVE_FROM_FAVORITES_SUCCESS,
		payload: { event },
	};
};

export const removeFromFavoritesFailure = (error) => {
	return {
		type: REMOVE_FROM_FAVORITES_FAILURE,
		payload: error,
	};
};

export const getUserFavorites = (userUid) => {
	return {
		type: GET_USER_FAVORITES,
		payload: { userUid },
	};
};

export const getUserFavoritesSuccess = (events) => {
	return {
		type: GET_USER_FAVORITES_SUCCESS,
		payload: { events },
	};
};

export const getUserFavoritesFailure = (error) => {
	return {
		type: GET_USER_FAVORITES_FAILURE,
		payload: error,
	};
};
