import { MODAL_CLOSE, MODAL_OPEN } from './modal.types';

const INITIAL_STATE = null;

export const modalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MODAL_OPEN:
			return action.payload;
		case MODAL_CLOSE:
			return null;
		default:
			return state;
	}
};
