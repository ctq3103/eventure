import React from 'react';
import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import FavoriteButton from '../Events/FavoriteButton';
import { objectToArray } from '../../utils/helpers';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		display: 'flex',
		padding: theme.spacing(2),
		maxWidth: 500,
		height: '100%',
	},
	image: {
		width: 128,
		height: 128,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.text.primary,
	},
});

class FavoriteItem extends React.Component {
	render() {
		const {
			classes,
			auth,
			event,
			addToFavorites,
			removeFromFavorites,
		} = this.props;

		const { title, date, imageURL, id, creator } = event;

		const favorites =
			event && event.favorites && objectToArray(event.favorites);

		const isInFavorites =
			favorites && favorites.some((user) => user.id === auth.uid);

		return (
			<Paper elevator={0} className={classes.paper}>
				<Grid container spacing={4} alignItems="center" justify="center">
					<Grid item>
						<ButtonBase className={classes.image}>
							<img
								className={classes.img}
								src={
									imageURL
										? imageURL
										: require('../../assets/event-img-placeholder.jpg')
								}
								alt={title}
							/>
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid
							item
							xs
							container
							direction="column"
							spacing={2}
							alignItems="center"
							justify="center"
						>
							<Grid item xs>
								{date && typeof date.toDate === 'function' && (
									<Typography variant="body2" align="left" color="primary">
										{format(date.toDate(), 'EEE, MMM dd')} at{' '}
										{format(date.toDate(), 'hh:mm aaa')}
									</Typography>
								)}
								<Typography variant="body2" gutterBottom>
									{title}
								</Typography>
								<Typography variant="body2" color="textSecondary">
									by {creator}
								</Typography>
							</Grid>
							<Grid item>
								<Link to={`/event/${id}`} className={classes.link}>
									<Typography variant="body2">View details</Typography>
								</Link>
							</Grid>
						</Grid>
						<FavoriteButton
							addToFavorites={addToFavorites}
							removeFromFavorites={removeFromFavorites}
							isInFavorites={isInFavorites}
							event={event}
						/>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

export default compose(
	withStyles(styles, { withTheme: true }),
	withFirestore
)(FavoriteItem);
