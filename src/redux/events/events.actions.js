import {
	CREATE_EVENT,
	UPDATE_EVENT,
	DELETE_EVENT,
	CREATE_EVENT_SUCCESS,
	CREATE_EVENT_FAILURE,
	UPDATE_EVENT_SUCCESS,
	UPDATE_EVENT_FAILURE,
	DELETE_EVENT_SUCCESS,
	DELETE_EVENT_FAILURE,
} from './events.types';

export const createEvent = (event, history) => {
	return {
		type: CREATE_EVENT,
		payload: {
			event,
			history,
		},
	};
};

export const createEventSuccess = (event) => {
	return {
		type: CREATE_EVENT_SUCCESS,
		payload: {
			event,
		},
	};
};

export const createEventFailure = (error) => {
	return {
		type: CREATE_EVENT_FAILURE,
		payload: {
			error,
		},
	};
};

export const updateEvent = (event) => {
	return {
		type: UPDATE_EVENT,
		payload: {
			event,
		},
	};
};

export const updateEventSuccess = (event) => {
	return {
		type: UPDATE_EVENT_SUCCESS,
		payload: {
			event,
		},
	};
};

export const updateEventFailure = (error) => {
	return {
		type: UPDATE_EVENT_FAILURE,
		payload: {
			error,
		},
	};
};

export const deleteEvent = (event) => {
	return {
		type: DELETE_EVENT,
		payload: {
			event,
		},
	};
};

export const deleteEventSuccess = (event) => {
	return {
		type: DELETE_EVENT_SUCCESS,
		payload: {
			event,
		},
	};
};

export const deleteEventFailure = (error) => {
	return {
		type: DELETE_EVENT_FAILURE,
		payload: {
			error,
		},
	};
};
