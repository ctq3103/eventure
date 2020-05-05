import { createSelector } from 'reselect';

const selectFav = (state) => state.favorite;

export const selectFavItems = createSelector(
	[selectFav],
	(favorite) => favorite.favItems
);

export const selectFavItemsCount = createSelector(
	[selectFavItems],
	(favItems) => favItems.length
);
