import React from 'react';
import { connect } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import EventItem from '../../components/Events/EventItem.CategoryPage';
import Loading from '../../components/Loading';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: theme.spacing(10),
		color: theme.palette.text.secondary,
	},
	typography: {
		marginBottom: theme.spacing(10),
	},
}));

const EventCategory = ({ events, match, requesting }) => {
	const classes = useStyles();

	useFirestoreConnect([{ collection: 'events' }]);

	const getEventListByCategory = (events) => {
		let eventsByCategory = events.reduce((events, event) => {
			const { category } = event;
			const routeName = category.split(' ')[0].toLowerCase();
			events[routeName] = events[routeName]
				? [...events[routeName], event]
				: [category, event];
			return events;
		}, {});
		return eventsByCategory;
	};

	const loading = Object.values(requesting).some((item) => item === true);

	if (!isLoaded(events) || loading) return <Loading />;

	let eventListAllCategory = getEventListByCategory(events);
	let eventListEachCategory = eventListAllCategory[match.params.category];
	let categoryName = eventListEachCategory[0].toUpperCase();
	let eventList = eventListEachCategory.slice(1);

	return (
		<div className={classes.root}>
			<Grid container justify="center" alignItems="center">
				<Typography className={classes.typography} variant="h4" color="inherit">
					{categoryName}
				</Typography>

				<Grid container item spacing={5} justify="center" alignItems="stretch">
					{eventList &&
						eventList.map((event) => (
							<Grid item xs={12} sm={6} md={3} key={event.id}>
								<EventItem event={event} />
							</Grid>
						))}
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		events: state.firestore.ordered.events,
		requesting: state.firestore.status.requesting,
	};
};

export default connect(mapStateToProps)(EventCategory);
