import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';

const EventDetailButton = ({
	event,
	history,
	isCreator,
	isAttendee,
	joinEvent,
	cancelJoinEvent,
	authenticated,
	openModal,
	dispatch,
}) => {
	const { cancelled } = event;

	return (
		<Grid item>
			{isCreator && (
				<Button
					onClick={() => history.push(`/manage/${event.id}`)}
					fullWidth
					variant="contained"
					color="primary"
					size="large"
				>
					MANAGE EVENT
				</Button>
			)}

			{!isCreator && !cancelled && isAttendee && (
				<Button
					fullWidth
					variant="contained"
					color="inherit"
					size="large"
					onClick={() => cancelJoinEvent(event)}
				>
					CANCEL MY PLACE
				</Button>
			)}

			{!isAttendee && authenticated && (
				<Button
					fullWidth
					variant="contained"
					color="secondary"
					size="large"
					onClick={() => joinEvent(event)}
				>
					JOIN EVENT
				</Button>
			)}

			{!authenticated && (
				<Button
					fullWidth
					variant="contained"
					color="secondary"
					size="large"
					onClick={() => openModal('SignInModal')}
				>
					JOIN EVENT
				</Button>
			)}
		</Grid>
	);
};

export default withRouter(EventDetailButton);
