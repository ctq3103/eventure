import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import EventDetailInfo from '../../components/Events/EventDetailInfo';
import EventDetailBtn from '../../components/Events/EventDetailBtn';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: '50px',
	},
	paper: {
		textAlign: 'left',
		color: theme.palette.text.primary,
		padding: theme.spacing(6),
	},
}));

const mapStateToProps = (state, ownProps) => {
	console.log(ownProps);
	const eventId = ownProps.match.params.id;
	let event = {};

	if (eventId && state.events.length > 0) {
		event = state.events.filter((event) => event.id === eventId)[0];
	}

	console.log(event);

	return {
		event: event,
	};

	//.filter((event) => event.id === eventId
};

const EventDetailPage = ({ event }) => {
	console.log(event);
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Paper elevation={3} className={classes.paper}>
				<EventDetailInfo event={event}>
					<EventDetailBtn event={event} />
				</EventDetailInfo>
			</Paper>
		</div>
	);
};

export default connect(mapStateToProps)(EventDetailPage);
