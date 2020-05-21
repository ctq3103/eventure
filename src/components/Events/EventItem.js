import React from 'react';
import { withRouter } from 'react-router-dom';
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
import Chip from '@material-ui/core/Chip';
import FavIcon from './FavIcon';
import Grid from '@material-ui/core/Grid';

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
	cancelled: {
		display: 'block',
		marginLeft: 'auto',
	},
}));

const EventItem = ({ event, history, match }) => {
	const classes = useStyles();
	const { title, date, imageURL, id, cancelled } = event;
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
						className={classes.cancelled}
					>
						{cancelled && (
							<Chip label="Cancelled" color="primary" variant="outlined" />
						)}
					</CardActions>
				</Grid>
			</Grid>
		</Card>
	);
};

export default withRouter(EventItem);
