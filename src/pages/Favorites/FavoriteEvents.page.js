import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import FavoriteItem from '../../components/Favorite/FavoriteItem';
import { selectFavItems } from '../../redux/favorite/favorite.selectors';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: theme.spacing(5),
	},

	typography: {
		marginBottom: theme.spacing(4),
		marginTop: theme.spacing(4),
	},
}));

function FavoriteEvents({ favItems }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid container justify="center" alignItems="center" spacing={3}>
				<Grid item xs={12}>
					<Typography
						className={classes.typography}
						variant="h4"
						color="primary"
					>
						Favorites
					</Typography>
					<Grid container spacing={3}>
						{favItems.length ? (
							favItems.map((favItem) => (
								<Grid key={favItem.id} item xs={12} sm={6}>
									<FavoriteItem favItem={favItem} />
								</Grid>
							))
						) : (
							<Typography className={classes.typography} variant="h4">
								No favorite
							</Typography>
						)}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	favItems: selectFavItems,
});

export default connect(mapStateToProps)(FavoriteEvents);
