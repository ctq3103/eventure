import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Badge } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { selectFavItemsCount } from '../../redux/favorite/favorite.selectors';

const FavoriteIconNav = ({ favItemsCount }) => {
	return (
		<Badge badgeContent={favItemsCount} color="primary">
			<FavoriteBorderIcon />
		</Badge>
	);
};

const mapStateToProps = createStructuredSelector({
	favItemsCount: selectFavItemsCount,
});

export default connect(mapStateToProps)(FavoriteIconNav);
