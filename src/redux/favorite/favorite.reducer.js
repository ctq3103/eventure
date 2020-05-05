import { TOGGLE_ADD_FAV_ITEM, CLEAR_FAV_ITEM } from './favorite.types';
import { toggleAddRemoveItem } from './favorite.utils';

const INITIAL_STATE = {
	favItems: [],
};

export const favoriteItemReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TOGGLE_ADD_FAV_ITEM:
			return {
				...state,
				favItems: toggleAddRemoveItem(state.favItems, action.payload),
			};
		case CLEAR_FAV_ITEM:
			return {
				...state,
				favItems: state.favItems.filter(
					(item) => item.id !== action.payload.id
				),
			};
		default:
			return state;
	}
};
