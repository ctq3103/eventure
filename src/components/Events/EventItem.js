import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { format } from 'date-fns';
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
import FavIcon from './FavIcon';
import Grid from '@material-ui/core/Grid';
import { deleteEvent } from '../../redux/events/events.actions';

const useStyles = makeStyles(() => ({
	root: {
		maxWidth: 350,
	},
	mediaWrapper: {
		backgroundColor: '#f7f1e3',
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
	const { title, date, imageURL, id } = event;
	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={
					imageURL
						? imageURL
						: require('../../assets/event-img-placeholder.jpg')
				}
				title={title}
			/>

			<CardContent>
				<Typography variant="body1" align="left" color="primary">
					{format(date.toDate(), 'EEE, MMM dd')} at{' '}
					{format(date.toDate(), 'HH:mm')}
				</Typography>
				<Typography variant="subtitle1" align="left" component="p">
					{title}
				</Typography>
			</CardContent>

			<Grid container>
				<Grid item xs={6}>
					<CardActions disableSpacing>
						<FavIcon event={event} />

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
