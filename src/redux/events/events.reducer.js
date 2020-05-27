import { FETCH_EVENTS_SUCCESS, GET_NEXT_EVENTS_SUCCESS } from './events.types';

export const eventsReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_EVENTS_SUCCESS:
			return action.payload;
		case GET_NEXT_EVENTS_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
