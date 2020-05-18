import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from './components/Header/Header';
import Homepage from './pages/Events/Homepage';
import BrowseEvents from './pages/Events/BrowseEvents.page';
import ModalManager from './components/modal/modal.manager';
import FavoriteEvents from './pages/Favorites/FavoriteEvents.page';
import EventDetailPage from './pages/Events/EventDetails.page';
import EventCategory from './pages/Events/EventsByCategory.page';
import EventForm from './components/Events/EventForm';
import SettingPage from './pages/Users/SettingPage';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#ef706f',
			main: '#eb4d4b',
			dark: '#a43534',
			contrastText: '#fff',
		},
		secondary: {
			light: '#868ae6',
			main: '#686de0',
			dark: '#484c9c',
			contrastText: '#fff',
		},
		text: {
			primary: '#34495e',
		},
	},
});

const App = ({ location }) => {
	return (
		<ThemeProvider theme={theme}>
			<ModalManager />
			<Header />
			<Switch key={location.key}>
				<Route exact path="/" component={Homepage} />
				<Route exact path="/category/:category" component={EventCategory} />
				<Route
					exact
					path={['/createEvent', '/manage/:id']}
					component={EventForm}
				/>
				<Route exact path="/events" component={BrowseEvents} />
				<Route path="/event/:id" component={EventDetailPage} />
				<Route exact path="/favorites" component={FavoriteEvents} />
				<Route exact path="/settings" component={SettingPage} />
			</Switch>
		</ThemeProvider>
	);
};

export default withRouter(App);
