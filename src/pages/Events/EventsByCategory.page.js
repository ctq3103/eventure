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

class EventCategory extends React.Component {
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

	getEventListByCategory = (events) => {
		let eventsByCategory = events.reduce((events, event) => {
			//get Category from Event object
			const { category } = event;

			//routeName is the first word of category name:
			//category name: 'Bussiness & Professional
			//routeName: 'business
			const routeName = category.split(' ')[0].toLowerCase();

			//key-value pairs of category-eventlist
			//if there is eventlist array, add new event to array
			//else create new array with category name of index 0, then add event to new array
			events[routeName] = events[routeName]
				? [...events[routeName], event]
				: [category, event];
			return events;
		}, {});
		return eventsByCategory;
	};

	render() {
		const {
			classes,
			events,
			loading,
			getNextEvents,
			moreEvents,
			match,
		} = this.props;
		const { loadedEvents, loadingInitial } = this.state;

		if (loadingInitial) return <Loading />;

		let lastEvent = events && events[events.length - 1];

		//get Object all events grouped by Category
		let eventListAllCategory =
			loadedEvents && this.getEventListByCategory(loadedEvents);

		//if Route is '/business', get the array which is value of Business object
		let eventListEachCategory = eventListAllCategory[match.params.category];

		//get Category name (first item in array)
		let categoryName = eventListEachCategory[0].toUpperCase();

		//list of all events of that specific category, all items in array execpt the 1st item
		let eventList = eventListEachCategory.slice(1);

		return (
			<div className={classes.root}>
				<Grid container justify="center" alignItems="center">
					<Typography
						className={classes.typography}
						variant="h4"
						color="inherit"
					>
						{categoryName}
					</Typography>
				</Grid>

				<EventList
					moreEvents={moreEvents}
					loading={loading}
					events={eventList}
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
	connect(mapStateToProps, mapDispatchToProps)(EventCategory)
);
