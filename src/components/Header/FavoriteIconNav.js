import React from 'react';
import { connect } from 'react-redux';
import { Badge } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { getUserFavorites } from '../../redux/favorite/favorite.actions';

class FavoriteIconNav extends React.Component {
	componentDidMount() {
		const { getUserFavorites, auth } = this.props;
		if (!auth.uid) {
			return;
		} else {
			getUserFavorites(auth.uid);
		}
	}

	render() {
		const { favorites } = this.props;
		return (
			<Badge badgeContent={favorites.length} color="primary">
				<FavoriteBorderIcon />
			</Badge>
		);
	}
}

const mapDispatchToProps = {
	getUserFavorites,
};

const mapStateToProps = (state) => {
	return {
		favorites: state.favorites,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteIconNav);
