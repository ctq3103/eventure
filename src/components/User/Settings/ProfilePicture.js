import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	Divider,
	Typography,
	Paper,
	Button,
	CardActions,
} from '@material-ui/core';
import DropzoneInput from './ImageProcessing/DropzoneInput';
import CropperInput from './ImageProcessing/CropperInput';
import {
	uploadPhoto,
	deletePhoto,
	setProfilePhoto,
} from '../../../redux/user/user.actions';
import { toastr } from 'react-redux-toastr';
import UserPhotos from './UserPhotos';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		marginLeft: theme.spacing(8),
		width: '70vw',
	},
	grid: {
		marginBottom: theme.spacing(2),
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: theme.spacing(40),
		height: theme.spacing(40),
		marginTop: theme.spacing(2),
	},
}));

const ProfilePicture = ({
	uploadPhoto,
	deletePhoto,
	setProfilePhoto,
	photos,
	profile,
	auth,
}) => {
	useFirestoreConnect([
		{
			collection: 'users',
			doc: auth.uid,
			subcollections: [{ collection: 'photos' }],
			storeAs: 'photos',
		},
	]);

	const [files, setFiles] = useState([]);
	const [image, setImage] = useState(null);

	//clean up image preview in memory
	useEffect(() => {
		return () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
	}, [files]);

	const classes = useStyles();

	const handleUploadImage = async () => {
		try {
			await uploadPhoto(image, files[0].name);
			handleCancelCrop();
			toastr.success('Success', 'Photo has been uploaded');
		} catch (error) {
			toastr.error('Oops', 'Something went wrong');
		}
	};

	const handleCancelCrop = () => {
		setFiles([]);
		setImage([]);
	};

	const handleDeletePhoto = (photo) => {
		deletePhoto(photo);
	};

	const handleSetProfilePhoto = (photo) => {
		setProfilePhoto(photo);
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={3} className={classes.grid} justify="center">
				<Grid item xs={12} sm={4}>
					<Typography variant="subtitle1" align="center">
						1. Drag and drop your photo
					</Typography>
					<DropzoneInput setFiles={setFiles} />
				</Grid>

				<Grid item xs={12} sm={4}>
					<Typography variant="subtitle1" align="center">
						2. Resizing photo
					</Typography>
					{files.length > 0 && (
						<Paper elevation={0} className={classes.paper}>
							<CropperInput
								setImage={setImage}
								imagePreview={files[0].preview}
							/>
						</Paper>
					)}
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography variant="subtitle1" align="center">
						3. Preview and Upload
					</Typography>

					{files.length > 0 && (
						<Paper elevation={0} className={classes.paper}>
							<div
								id="img-preview"
								style={{
									minHeight: '270px',
									minWidth: '270px',
									overflow: 'hidden',
								}}
							/>

							<CardActions>
								<Button
									variant="outlined"
									color="secondary"
									onClick={handleUploadImage}
								>
									Upload
								</Button>
								<Button
									variant="outlined"
									color="primary"
									onClick={handleCancelCrop}
								>
									Cancel
								</Button>
							</CardActions>
						</Paper>
					)}
				</Grid>
			</Grid>

			<Divider variant="middle" />

			<UserPhotos
				photos={photos}
				profile={profile}
				deletePhoto={handleDeletePhoto}
				setProfilePhoto={handleSetProfilePhoto}
			/>
		</div>
	);
};

const mapDispatchToProps = {
	uploadPhoto,
	deletePhoto,
	setProfilePhoto,
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile,
	photos: state.firestore.ordered.photos,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicture);
