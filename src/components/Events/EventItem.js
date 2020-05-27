import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 350,
		height: '100%',
	},
	link: {
		textDecoration: 'none',
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
		<Link className={classes.link} to={`/event/${id}`} target="_blank">
			<Card className={classes.card}>
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
					{cancelled ? (
						<Chip label="Cancelled" color="primary" />
					) : (
						date &&
						typeof date.toDate === 'function' && (
							<Typography variant="body1" align="left" color="primary">
								{format(date.toDate(), 'EEE, MMM dd')} at{' '}
								{format(date.toDate(), 'hh:mm aaa')}
							</Typography>
						)
					)}

					<Typography variant="subtitle1" align="left">
						{title}
					</Typography>
				</CardContent>
			</Card>
		</Link>
	);
};

export default withRouter(EventItem);
