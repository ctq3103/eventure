import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import {
	addToFavorites,
	removeFromFavorites,
	getUserFavorites,
} from '../../redux/favorite/favorite.actions';
import FavoriteItem from '../../components/Favorite/FavoriteItem';
import Loading from '../../components/Loading';

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

class FavoriteEvents extends React.Component {
	async componentDidMount() {
		const { auth, getUserFavorites } = this.props;
		await getUserFavorites(auth.uid);
	}

	render() {
		const {
			classes,
			auth,
			favorites,
			requesting,
			loading,
			addToFavorites,
			removeFromFavorites,
		} = this.props;

		const isRequesting = Object.values(requesting).some(
			(data) => data === true
		);
		if (loading || isRequesting) return <Loading />;

		return (
			<div className={classes.root}>
				<Grid container justify="center" alignItems="center">
					<Typography
						className={classes.typography}
						variant="h4"
						color="inherit"
					>
						FAVORITES
					</Typography>
				</Grid>
				<Grid container spacing={3} justify="center" alignItems="center">
					{favorites.length ? (
						favorites.map((event) => (
							<Grid key={event.id} item xs={12} sm={6}>
								<FavoriteItem
									auth={auth}
									event={event}
									addToFavorites={addToFavorites}
									removeFromFavorites={removeFromFavorites}
								/>
							</Grid>
						))
					) : (
						<Typography className={classes.typography} variant="h6">
							No favorite
						</Typography>
					)}
				</Grid>
			</div>
		);
	}
}

const mapDispatchToProps = {
	addToFavorites,
	removeFromFavorites,
	getUserFavorites,
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		loading: state.async.loading,
		favorites: state.favorites,
		requesting: state.firestore.status.requesting,
	};
};

export default compose(
	withStyles(styles, { withTheme: true }),
	withFirestore
)(connect(mapStateToProps, mapDispatchToProps)(FavoriteEvents));
