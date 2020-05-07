import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { Tooltip, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { toggleAddFavItem } from '../../redux/favorite/favorite.actions';
import { selectFavItems } from '../../redux/favorite/favorite.selectors';

const FavIconEvent = ({ event, favItems, dispatch }) => {
	return (
		<Tooltip
			title={
				favItems.includes(event) ? 'Remove from favorites' : 'Add to favorites'
			}
		>
			<IconButton
				aria-label={
					favItems.includes(event)
						? 'Add to favorites'
						: 'Remove from favorites'
				}
				onClick={() => dispatch(toggleAddFavItem(event))}
			>
				{favItems.includes(event) ? (
					<FavoriteIcon color="primary" />
				) : (
					<FavoriteBorderOutlinedIcon />
				)}
			</IconButton>
		</Tooltip>
	);
};

const mapStateToProps = createStructuredSelector({
	favItems: selectFavItems,
});

export default connect(mapStateToProps)(FavIconEvent);
