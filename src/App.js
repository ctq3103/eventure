import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Homepage from './pages/Events/Homepage';
import BrowseEvents from './pages/Events/BrowseEvents.page';
import ModalManager from './components/modal/modal.manager';
import FavoriteEvents from './pages/Events/FavoriteEvents.page';
import EventDetailPage from './pages/Events/EventDetails.page';
import EventCategory from './pages/Events/EventsByCategory.page';
import EventForm from './components/Events/EventForm';

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

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<ModalManager />
			<Header />
			<Switch>
				<Route exact path="/" component={Homepage} />
				<Route exact path="/category/:category" component={EventCategory} />
				<Route exact path="/createEvent" component={EventForm} />
				<Route exact path="/events" component={BrowseEvents} />
				<Route exact path="/event/:id" component={EventDetailPage} />
				<Route exact path="/favorites" component={FavoriteEvents} />
			</Switch>
		</ThemeProvider>
	);
}
