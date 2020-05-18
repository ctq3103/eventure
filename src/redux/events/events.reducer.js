import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './events.types';

export const eventsReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_EVENT:
			return [...state, action.payload.event];
		case UPDATE_EVENT:
			return [
				...state.filter((event) => event.id !== action.payload.event.id),
				action.payload.event,
			];
		case DELETE_EVENT:
			return [...state.filter((event) => event.id !== action.payload.event.id)];
		default:
			return state;
	}
};
