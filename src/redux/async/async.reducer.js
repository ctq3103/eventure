import { ASYNC_ACTION_START } from './async.types';

const INITIAL_STATE = {
	loading: false,
};

export const asyncReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ASYNC_ACTION_START:
			return {
				...state,
				loading: true,
			};
		default:
			return {
				...state,
				loading: false,
			};
	}
};
