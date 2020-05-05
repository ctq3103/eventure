import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectAuthError = createSelector(
	[selectAuth],
	(auth) => auth.error
);
