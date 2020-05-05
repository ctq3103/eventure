import { TOGGLE_ADD_FAV_ITEM, CLEAR_FAV_ITEM } from './favorite.types';

export const toggleAddFavItem = (item) => ({
	type: TOGGLE_ADD_FAV_ITEM,
	payload: item,
});

export const clearFavItem = (item) => ({
	type: CLEAR_FAV_ITEM,
	payload: item,
});
