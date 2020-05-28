import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {
	Typography,
	Button,
	Fab,
	Grid,
	Avatar,
	makeStyles,
	Paper,
} from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Chip from '@material-ui/core/Chip';
import FavIcon from '../FavIcon';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: theme.spacing(9),
	},
	paper: {
		textAlign: 'left',
		color: theme.palette.text.primary,
		padding: theme.spacing(7),
	},
	imgWrapper: {
		position: 'relative',
		paddingBottom: '56.25%',
	},
	img: {
		position: 'absolute',
		objectFit: 'cover',
		width: '100%',
		height: '100%',
	},
	imgBtn: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
	},
	detailedInfo: {
		marginBottom: theme.spacing(5),
	},
	link: {
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
		'&:visited': {
			textDecoration: 'none',
		},
	},
}));

const EventDetailInfo = ({
	event,
	attendees,
	history,
	isCreator,
	isAttendee,
	joinEvent,
	cancelJoinEvent,
}) => {
	const classes = useStyles();
	const {
		id,
		title,
		date,
		venue,
		imageURL,
		description,
		creator,
		creatorUid,
		cancelled,
	} = event;
	return (
		<div className={classes.root}>
			<Paper elevation={3} className={classes.paper}>
				<Grid container spacing={5}>
					{/* Header */}
					<Grid item xs={12} sm={8}>
						<div className={classes.imgWrapper}>
							<img
								className={classes.img}
								src={
									imageURL
										? imageURL
										: require('../../../assets/event-img-placeholder.jpg')
								}
								alt={title}
							/>

							{isCreator && (
								<Fab
									onClick={() => history.push(`/eventImage/${id}`)}
									color="inherit"
									aria-label="event-image"
									className={classes.imgBtn}
								>
									<PhotoCameraIcon />
								</Fab>
							)}
						</div>
					</Grid>

					<Grid
						container
						item
						xs={12}
						sm={4}
						direction="column"
						justify="space-between"
					>
						<Grid container item direction="row" justify="space-between">
							<Grid item>
								{cancelled ? (
									<Chip label="Cancelled" color="primary" />
								) : (
									date && (
										<Typography variant="h6">
											{format(date.toDate(), 'MMM dd')}
										</Typography>
									)
								)}
							</Grid>
							<Grid item>
								<FavIcon event={event} />
							</Grid>
						</Grid>
						<Grid item>
							<Typography gutterBottom variant="h5">
								{title}
							</Typography>

							<Link to={`/profile/${creatorUid}`} className={classes.link}>
								<Typography
									gutterBottom
									variant="subtitle1"
									color="textSecondary"
								>
									by {creator}
								</Typography>
							</Link>
						</Grid>
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

							{!isCreator && !cancelled && (
								<>
									{isAttendee ? (
										<Button
											fullWidth
											variant="contained"
											color="inherit"
											size="large"
											onClick={() => cancelJoinEvent(event)}
										>
											CANCEL MY PLACE
										</Button>
									) : (
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
								</>
							)}
						</Grid>
					</Grid>

					{/* Body - Detail Info */}

					<Grid item xs={12} sm={8}>
						<Typography component="div" variant="body1">
							{description &&
								description.split('\n').map((i, key) => {
									return <p key={key}>{i}</p>;
								})}
						</Typography>
					</Grid>

					<Grid item xs={12} sm={4}>
						<div className={classes.detailedInfo}>
							<Typography variant="h6" gutterBottom>
								Date & Time
							</Typography>
							{date && (
								<Typography variant="body1" gutterBottom>
									{format(date.toDate(), 'EEE, MMM dd')} at{' '}
									{format(date.toDate(), 'hh:mm aaa')}
								</Typography>
							)}
						</div>
						<div className={classes.detailedInfo}>
							<Typography variant="h6" gutterBottom>
								Venue
							</Typography>
							<Typography variant="body1" gutterBottom>
								{venue}
							</Typography>
						</div>

						{attendees && (
							<div className={classes.detailedInfo}>
								<Typography variant="h6" gutterBottom>
									Attendees
								</Typography>

								<AvatarGroup max={5}>
									{attendees.map((attendee) => (
										<Avatar
											key={attendee.id}
											alt={attendee.name}
											src={attendee.photoURL}
										/>
									))}
								</AvatarGroup>
							</div>
						)}
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default withRouter(EventDetailInfo);
