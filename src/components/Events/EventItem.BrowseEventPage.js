import React from 'react';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 350,
		height: '100%',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
		'&:hover': {
			cursor: 'pointer',
		},
	},
	title: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
}));

const EventItem = ({ event, history }) => {
	const classes = useStyles();
	const { title, date, imageURL, id, cancelled } = event;
	return (
		<Card className={classes.root}>
			<CardMedia
				onClick={() => history.push(`/event/${id}`)}
				className={classes.media}
				image={
					imageURL
						? imageURL
						: require('../../assets/event-img-placeholder.jpg')
				}
				title={title}
			/>

			<CardContent>
				{cancelled ? (
					<Chip label="Cancelled" color="primary" />
				) : (
					date && (
						<Typography variant="body1" align="left" color="primary">
							{format(date.toDate(), 'EEE, MMM dd')} at{' '}
							{format(date.toDate(), 'hh:mm aaa')}
						</Typography>
					)
				)}

				<Typography
					variant="h6"
					align="left"
					component="p"
					onClick={() => history.push(`/event/${id}`)}
				>
					{title}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default withRouter(EventItem);
