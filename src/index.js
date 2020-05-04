import React from 'react';
import ReactDOM from 'react-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import App from './App';
import { store } from './redux/store';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from './config/firebase';

//React-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	attachAuthIsReady: true,
	// Firestore for Profile instead of Realtime DB
	useFirestoreForProfile: true,
	createFirestoreInstance,
};

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
};

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<ReduxToastr
					preventDuplicates
					position="bottom-right"
					getState={(state) => state.toastr}
					transitionIn="fadeIn"
					transitionOut="fadeOut"
					progressBar
					closeOnToastrClick
				/>
				<App />
			</ReactReduxFirebaseProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
