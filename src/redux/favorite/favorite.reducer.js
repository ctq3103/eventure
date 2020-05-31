import {
	GET_USER_FAVORITES_SUCCESS,
	REMOVE_FROM_FAVORITES_SUCCESS,
	ADD_TO_FAVORITES_SUCCESS,
} from './favorite.types';

export const favoritesReducer = (state = [], action) => {
	switch (action.type) {
		case GET_USER_FAVORITES_SUCCESS:
			return action.payload.events;
		case ADD_TO_FAVORITES_SUCCESS:
			return [...state, action.payload.event];
		case REMOVE_FROM_FAVORITES_SUCCESS:
			return [...state.filter((item) => item.id !== action.payload.event.id)];
		default:
			return state;
	}
};
