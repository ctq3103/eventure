import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import FavoriteItem from '../../components/Events/FavoriteItem';
import { selectFavItems } from '../../redux/favorite/favorite.selectors';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},

	typography: {
		marginBottom: '1em',
		marginTop: '1em',
	},
}));

function FavoriteEvents({ favItems }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid container justify="center" alignItems="center">
				<Grid item xs={12} sm={10}>
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
							<Typography
								className={classes.typography}
								variant="h4"
								color="inherit"
							>
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
