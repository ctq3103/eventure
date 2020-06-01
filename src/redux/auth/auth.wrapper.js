import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../modals/modal.actions';

export const UserIsAuthenticated = connectedReduxRedirect({
	wrapperDisplayName: 'UserIsAuthenticated',
	allowRedirectedBack: true,
	redirectPath: '/events',
	authenticatedSelector: ({ firebase: { auth } }) =>
		auth.isLoaded && !auth.isEmpty,
	redirectAction: (newLoc) => (dispatch) => {
		dispatch(openModal('RedirectModal'));
	},
});