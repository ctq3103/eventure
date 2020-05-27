import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Grid, Typography, withStyles } from '@material-ui/core';
import EventList from '../../components/Events/EventList';
import Loading from '../../components/Loading';
import { fetchEvents, getNextEvents } from '../../redux/events/events.actions';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		margin: theme.spacing(10),
		color: theme.palette.text.secondary,
	},
	typography: {
		marginBottom: theme.spacing(10),
	},
});

class BrowseEvents extends React.Component {
	state = {
		loadedEvents: [],
		loadingInitial: true,
	};

	componentDidMount() {
		this.props.fetchEvents();
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.events !== prevProps.events) {
			let filteredEvents = [
				...prevState.loadedEvents,
				...this.props.events,
			].filter((event) => typeof event.date.toDate === 'function');
			this.setState({
				loadedEvents: filteredEvents,
				loadingInitial: false,
			});
		}
	};

	render() {
		const { classes, events, loading, getNextEvents, moreEvents } = this.props;
		const { loadedEvents, loadingInitial } = this.state;

		if (loadingInitial) return <Loading />;

		let lastEvent = events && events[events.length - 1];

		return (
			<div className={classes.root}>
				<Grid container justify="center" alignItems="center">
					<Typography
						className={classes.typography}
						variant="h4"
						color="inherit"
					>
						ALL EVENTS
					</Typography>
				</Grid>

				<EventList
					moreEvents={moreEvents}
					loading={loading}
					events={loadedEvents}
					getNextEvents={getNextEvents}
					lastEvent={lastEvent}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = {
	fetchEvents,
	getNextEvents,
};

const mapStateToProps = (state) => ({
	events: state.events.events,
	loading: state.async.loading,
	moreEvents: state.events.moreEvents,
});

export default compose(withStyles(styles, { withTheme: true }))(
	connect(mapStateToProps, mapDispatchToProps)(BrowseEvents)
);
