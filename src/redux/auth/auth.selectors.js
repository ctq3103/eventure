import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectAuthError = createSelector(
	[selectAuth],
	(auth) => auth.error
);

export const selectUpdatePasswordError = createSelector(
	[selectAuth],
	(auth) => auth.updatePasswordError
);
