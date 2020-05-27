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
	UPLOAD_EVENT_IMAGE,
	UPLOAD_EVENT_IMAGE_SUCCESS,
	UPLOAD_EVENT_IMAGE_FAILURE,
	FETCH_EVENTS,
	FETCH_EVENTS_SUCCESS,
	FETCH_EVENTS_FAILURE,
	GET_NEXT_EVENTS_FAILURE,
	GET_NEXT_EVENTS_SUCCESS,
	GET_NEXT_EVENTS,
} from './events.types';

export const fetchEvents = (moreEvents) => {
	return {
		type: FETCH_EVENTS,
		payload: {
			moreEvents,
		},
	};
};

export const fetchEventsSuccess = (events, moreEvents) => {
	return {
		type: FETCH_EVENTS_SUCCESS,
		payload: {
			events,
			moreEvents,
		},
	};
};

export const fetchEventsFailure = (error) => {
	return {
		type: FETCH_EVENTS_FAILURE,
		payload: {
			error,
		},
	};
};

export const getNextEvents = (lastEvent, moreEvents) => {
	return {
		type: GET_NEXT_EVENTS,
		payload: {
			lastEvent,
			moreEvents,
		},
	};
};

export const getNextEventsSuccess = (events, moreEvents) => {
	return {
		type: GET_NEXT_EVENTS_SUCCESS,
		payload: {
			events,
			moreEvents,
		},
	};
};

export const getNextEventsFailure = (error) => {
	return {
		type: GET_NEXT_EVENTS_FAILURE,
		payload: {
			error,
		},
	};
};

export const createEvent = (event) => {
	return {
		type: CREATE_EVENT,
		payload: {
			event,
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

export const uploadEventImage = (file, fileName, eventId) => {
	return {
		type: UPLOAD_EVENT_IMAGE,
		payload: {
			file,
			fileName,
			eventId,
		},
	};
};

export const uploadEventImageSuccess = (file, fileName, eventId) => {
	return {
		type: UPLOAD_EVENT_IMAGE_SUCCESS,
		payload: { file, fileName, eventId },
	};
};

export const uploadEventImageFailure = (error) => {
	return {
		type: UPLOAD_EVENT_IMAGE_FAILURE,
		payload: {
			error,
		},
	};
};
