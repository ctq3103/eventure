import React from 'react';
import { connect } from 'react-redux';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { Tooltip, IconButton, Grid } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const FavoriteButton = ({
	event,
	addToFavorites,
	removeFromFavorites,
	isInFavorites,
}) => {
	return (
		<Grid item>
			{isInFavorites ? (
				<Tooltip title="Remove from favorites">
					<IconButton onClick={() => removeFromFavorites(event)}>
						<FavoriteIcon color="primary" />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Add to favorites">
					<IconButton onClick={() => addToFavorites(event)}>
						<FavoriteBorderOutlinedIcon />
					</IconButton>
				</Tooltip>
			)}
		</Grid>
	);
};

export default connect(null, null)(FavoriteButton);
