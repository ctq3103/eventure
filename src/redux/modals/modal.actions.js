import { MODAL_OPEN, MODAL_CLOSE } from './modal.types';

export const openModal = (type, props) => {
	return {
		type: MODAL_OPEN,
		payload: {
			type,
			props,
		},
	};
};

export const closeModal = () => {
	return {
		type: MODAL_CLOSE,
	};
};
