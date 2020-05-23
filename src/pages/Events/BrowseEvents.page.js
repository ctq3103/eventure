import React from 'react';
import { connect } from 'react-redux';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import EventItem from '../../components/Events/EventItem.BrowseEventPage';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
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

const BrowseEvents = ({ events, requesting }) => {
	const classes = useStyles();

	useFirestoreConnect([{ collection: 'events' }]);

	const loading = Object.values(requesting).some((item) => item === true);

	if (!isLoaded(events) || loading) return <Loading />;
	return (
		<div className={classes.root}>
			<Grid container justify="center" alignItems="center">
				<Typography className={classes.typography} variant="h4" color="inherit">
					ALL EVENTS
				</Typography>
			</Grid>

			<Grid container justify="center" alignItems="stretch" spacing={5}>
				{events &&
					events.map((event) => (
						<Grid item xs={12} sm={6} md={3} key={event.id}>
							<EventItem event={event} />
						</Grid>
					))}
			</Grid>
		</div>
	);
};

const mapStateToProps = (state) => ({
	events: state.firestore.ordered.events,
	requesting: state.firestore.status.requesting,
});

export default connect(mapStateToProps)(BrowseEvents);
