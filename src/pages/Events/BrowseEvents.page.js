import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import EventItem from '../../components/Events/EventItem';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		margin: '60px',
	},
	// typography: {
	// 	marginBottom: '1em',
	// 	marginTop: '1em',
	// },
});

const BrowseEvents = ({ events }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid container justify="center" alignItems="center" spacing={5}>
				{events.map((event) => (
					<Grid
						container
						justify="center"
						alignItems="center"
						item
						xs={12}
						sm={6}
						md={3}
						key={event.id}
					>
						<EventItem event={event} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

const mapStateToProps = (state) => ({
	events: state.events,
});

export default connect(mapStateToProps)(BrowseEvents);
