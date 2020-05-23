import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import { uploadEventImage } from '../../../../redux/events/events.actions';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(12),
		color: theme.palette.text.secondary,
	},
	typography: {
		marginBottom: theme.spacing(10),
	},
	button: {
		margin: theme.spacing(1),
		marginTop: theme.spacing(5),
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: theme.spacing(30),
		height: theme.spacing(30),
		marginTop: theme.spacing(2),
	},
}));

const EventImageUpload = ({ history, match, uploadEventImage }) => {
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
		await uploadEventImage(image, files[0].name, match.params.id);
		handleCancelCrop();
	};

	const handleCancelCrop = () => {
		setFiles([]);
		setImage([]);
	};

	return (
		<div className={classes.root}>
			<Grid container justify="center" alignItems="center">
				<Typography className={classes.typography} variant="h6" color="inherit">
					UPLOAD EVENT IMAGE
				</Typography>
				<Grid container spacing={1} justify="center">
					<Grid item xs={12} sm={4}>
						<Typography variant="subtitle1">1. Drag and drop photo</Typography>
						<DropzoneInput setFiles={setFiles} />
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography variant="subtitle1">2. Resizing photo</Typography>
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
						<Typography variant="subtitle1">3. Preview and Upload</Typography>

						{files.length > 0 && (
							<Paper elevation={0} className={classes.paper}>
								<div
									id="img-preview"
									style={{
										minHeight: '225px',
										minWidth: '400px',
										overflow: 'hidden',
									}}
								/>
							</Paper>
						)}
					</Grid>
				</Grid>
				<Grid container justify="center" alignItems="center">
					<Button
						className={classes.button}
						variant="outlined"
						color="secondary"
						onClick={handleUploadImage}
					>
						Upload
					</Button>
					<Button
						className={classes.button}
						variant="outlined"
						color="primary"
						onClick={handleCancelCrop}
					>
						Cancel
					</Button>
				</Grid>
				<Grid container justify="center" alignItems="center">
					<Button
						className={classes.button}
						variant="contained"
						color="inherit"
						onClick={() => history.goBack()}
					>
						Back to event page
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

const mapDispatchToProps = {
	uploadEventImage,
};

export default connect(null, mapDispatchToProps)(EventImageUpload);
