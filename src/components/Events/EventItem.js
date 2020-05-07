import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import LaunchIcon from '@material-ui/icons/Launch';
import DeleteIcon from '@material-ui/icons/Delete';
import FavIconEvent from './FavoriteIcon.EventPage';
import { Grid } from '@material-ui/core';
import { deleteEvent } from '../../redux/events/events.actions';

const useStyles = makeStyles(() => ({
	root: {
		maxWidth: 350,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	deleteAction: {
		display: 'block',
		marginLeft: 'auto',
	},
}));

const EventItem = ({ event, deleteEvent, history, match }) => {
	const classes = useStyles();
	const { title, date, imageUrl, id } = event;
	return (
		<Card className={classes.root}>
			<CardMedia className={classes.media} image={imageUrl} title={title} />

			<CardContent>
				<Typography variant="body2" align="left" color="primary">
					{date}
				</Typography>
				<Typography variant="subtitle1" align="left" component="p">
					{title}
				</Typography>
			</CardContent>

			<Grid container>
				<Grid item xs={6}>
					<CardActions disableSpacing>
						<FavIconEvent event={event} />

						<Tooltip title="See details">
							<IconButton
								aria-label="share"
								onClick={() => history.push(`/event/${id}`)}
							>
								<LaunchIcon />
							</IconButton>
						</Tooltip>
					</CardActions>
				</Grid>

				<Grid item xs={6}>
					<CardActions
						align="right"
						disableSpacing
						className={classes.deleteAction}
					>
						<Tooltip title="Delete Event">
							<IconButton
								as={Link}
								aria-label="delete event"
								onClick={() => deleteEvent(event)}
							>
								<DeleteIcon color="primary" />
							</IconButton>
						</Tooltip>
					</CardActions>
				</Grid>
			</Grid>
		</Card>
	);
};

const mapDispatchToProps = (dispatch) => ({
	deleteEvent: (event) => dispatch(deleteEvent(event)),
});

export default withRouter(connect(null, mapDispatchToProps)(EventItem));
