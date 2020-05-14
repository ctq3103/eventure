import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import FavIconEvent from './FavoriteIcon.EventPage';

const EventDetailBtn = ({ event: { id }, history }) => {
	return (
		<>
			<Grid item container spacing={2} justify="center">
				<Grid item xs sm={4}>
					<FavIconEvent />
				</Grid>
				<Grid item xs sm={4}>
					<Button
						onClick={() => history.push(`/manage/${id}`)}
						fullWidth
						variant="contained"
						color="primary"
						size="large"
					>
						Manage Event
					</Button>
				</Grid>
				<Grid item xs sm={4}>
					<Button fullWidth variant="contained" color="secondary" size="large">
						JOIN THIS EVENT
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default withRouter(EventDetailBtn);
