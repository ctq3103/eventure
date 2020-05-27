import {
	ASYNC_ACTION_FINISH,
	ASYNC_ACTION_START,
	ASYNC_ACTION_ERROR,
} from './async.types';

export const asyncActionStart = () => {
	return {
		type: ASYNC_ACTION_START,
		loading: true,
	};
};
export const asyncActionFinish = () => {
	return {
		type: ASYNC_ACTION_FINISH,
		loading: false,
	};
};
export const asyncActionError = () => {
	return {
		type: ASYNC_ACTION_ERROR,
		loading: false,
	};
};
