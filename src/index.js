import React from 'react';
import ReactDOM from 'react-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxToastr from 'react-redux-toastr';
import App from './App';
import { store, persistor } from './redux/store';
import { useSelector } from 'react-redux';

import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from './config/firebase';
import Loading from './components/Loading';
import history from './history';

//React-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	attachAuthIsReady: true,
	// Firestore for Profile instead of Realtime DB
	useFirestoreForProfile: true,
	updateProfileOnLogin: false,
	preserveOnLogin: { auth: true, profile: true },
};

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth)) return <Loading />;
	return children;
}

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<Router history={history}>
				<AuthIsLoaded>
					<ReduxToastr
						preventDuplicates
						position="bottom-right"
						getState={(state) => state.toastr}
						transitionIn="fadeIn"
						transitionOut="fadeOut"
						progressBar
						closeOnToastrClick
					/>
					<PersistGate persistor={persistor}>
						<App />
					</PersistGate>
				</AuthIsLoaded>
			</Router>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root')
);
