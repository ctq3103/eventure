import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import FavIconEvent from './FavoriteIcon.EventPage';

const EventDetailBtn = () => {
	return (
		<>
			<Grid item container spacing={2} justify="center">
				<Grid item xs sm={4}>
					<FavIconEvent />
				</Grid>
				<Grid item xs sm={4}>
					<Button fullWidth variant="outlined" color="primary" size="large">
						Secondary
					</Button>
				</Grid>
				<Grid item xs sm={4}>
					<Button fullWidth variant="contained" color="secondary" size="large">
						Secondary
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default EventDetailBtn;
