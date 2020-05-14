import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardMedia, CardActions, Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
	card: {
		//maxWidth: 200,
		marginTop: theme.spacing(2),
	},
	cardPhoto: {
		height: 0,
		paddingTop: '100%',
	},
}));

const UserPhotos = ({ photos, profile, deletePhoto, setProfilePhoto }) => {
	const classes = useStyles();

	let filteredPhotos;

	//fliter all photos except current profile photo
	if (photos) {
		filteredPhotos = photos.filter((photo) => {
			return photo.url !== profile.photoURL;
		});
	}
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={3}>
				<Card className={classes.card}>
					{profile.photoURL ? (
						<CardMedia className={classes.cardPhoto} image={profile.photoURL} />
					) : (
						<Skeleton
							animation="wave"
							variant="rect"
							className={classes.cardPhoto}
						/>
					)}
					<CardActions>
						<Button fullWidth color="secondary">
							Profile Picture
						</Button>
					</CardActions>
				</Card>
			</Grid>
			{photos &&
				filteredPhotos.map((photo) => (
					<Grid item xs={12} sm={3} key={photo.id}>
						<Card className={classes.card}>
							<CardMedia className={classes.cardPhoto} image={photo.url} />
							<CardActions>
								<Button
									fullWidth
									variant="outlined"
									color="secondary"
									onClick={() => setProfilePhoto(photo)}
								>
									Choose
								</Button>
								<Button
									fullWidth
									variant="outlined"
									color="primary"
									onClick={() => deletePhoto(photo)}
								>
									Delete
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
		</Grid>
	);
};

export default UserPhotos;
