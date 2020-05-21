import {
	CREATE_EVENT,
	UPDATE_EVENT,
	CREATE_EVENT_SUCCESS,
	CREATE_EVENT_FAILURE,
	UPDATE_EVENT_SUCCESS,
	UPDATE_EVENT_FAILURE,
	CANCEL_TOGGLE,
	CANCEL_TOGGLE_SUCCESS,
	CANCEL_TOGGLE_FAILURE,
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

export const cancelToggle = (cancelled, eventId) => {
	return {
		type: CANCEL_TOGGLE,
		payload: {
			cancelled,
			eventId,
		},
	};
};

export const cancelToggleSuccess = (cancelled, eventId) => {
	return {
		type: CANCEL_TOGGLE_SUCCESS,
		payload: { cancelled, eventId },
	};
};

export const cancelToggleFailure = (error) => {
	return {
		type: CANCEL_TOGGLE_FAILURE,
		payload: {
			error,
		},
	};
};
