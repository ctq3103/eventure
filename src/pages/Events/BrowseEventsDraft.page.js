import React from 'react';
import { Route } from 'react-router-dom';

import EventsOverview from '../../components/Events/EventsOverview';
import EventsByCategory from './EventsByCategory.page';

const BrowseEventsDraft = ({ match }) => {
	return (
		<div>
			<Route exact path={`${match.path}`} component={EventsOverview} />
			<Route
				exact
				path={`${match.path}/:category`}
				component={EventsByCategory}
			/>
		</div>
	);
};

export default BrowseEventsDraft;
