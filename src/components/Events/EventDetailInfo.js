import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
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
}));

const EventDetailInfo = ({ children, event }) => {
	const classes = useStyles();

	const {
		title,
		imageUrl,
		date,
		venue,
		description,
		creator,
		attendees,
	} = event;

	return (
		<Grid className={classes.root} container spacing={5}>
			{/* Header */}
			<Grid item xs={12} sm={8}>
				<div className={classes.imgWrapper}>
					<img className={classes.img} src={imageUrl} alt={title} />
				</div>
			</Grid>

			<Grid container item xs={12} sm={4}>
				<Grid item xs sm={10}>
					<Typography variant="subtitle1">{date}</Typography>
				</Grid>
				<Grid item>
					<Typography gutterBottom variant="h5">
						{title}
					</Typography>
					<Typography gutterBottom variant="subtitle1" color="textSecondary">
						by {creator}
					</Typography>
				</Grid>
			</Grid>

			{/* Buttons */}
			{children}

			{/* Body - Detail Info */}

			<Grid item xs={12} sm={8}>
				<Typography variant="body1">{description}</Typography>
			</Grid>
			<Grid container item xs={12} sm={4} direction="column" spacing={5}>
				<Grid item xs>
					<Typography variant="h6" gutterBottom>
						Date & Time
					</Typography>
					<Typography variant="body1" gutterBottom>
						{date}
					</Typography>
				</Grid>
				<Grid item xs>
					<Typography variant="h6" gutterBottom>
						Venue
					</Typography>
					<Typography variant="body1" gutterBottom>
						{venue}
					</Typography>
				</Grid>

				<Grid item xs>
					<Typography variant="h6" gutterBottom>
						Attendees
					</Typography>
					{attendees && (
						<AvatarGroup max={8}>
							{attendees.map((attendee) => (
								<Avatar
									key={attendee.id}
									alt={attendee.name}
									src={attendee.photoURL}
								/>
							))}
						</AvatarGroup>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default EventDetailInfo;
