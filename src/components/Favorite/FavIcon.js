import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { clearFavItem } from '../../redux/favorite/favorite.actions';

const FavIcon = ({ favItem, clearItem }) => {
	return (
		<Tooltip title="Remove from favorites">
			<IconButton
				aria-label="Remove from favorites"
				onClick={() => clearItem(favItem)}
			>
				<FavoriteIcon color="primary" />
			</IconButton>
		</Tooltip>
	);
};

const mapDispatchToProps = (dispatch) => ({
	clearItem: (item) => dispatch(clearFavItem(item)),
});

export default connect(null, mapDispatchToProps)(FavIcon);
