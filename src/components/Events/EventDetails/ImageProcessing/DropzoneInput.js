import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import BackupIcon from '@material-ui/icons/Backup';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: theme.spacing(20),
		height: theme.spacing(20),
		marginTop: theme.spacing(2),
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const DropzoneInput = ({ setFiles }) => {
	const classes = useStyles();

	const onDrop = useCallback(
		(acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
		[setFiles]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: 'image/*',
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<Paper elevation={1} className={classes.paper}>
					<Typography variant="subtitle1">Drop image here</Typography>
					<ArrowDropDownCircleIcon color="secondary" fontSize="large" />
				</Paper>
			) : (
				<Paper elevation={5} className={classes.paper}>
					<Typography variant="subtitle1">Drag and drop image here</Typography>
					<BackupIcon fontSize="large" color="secondary" />
				</Paper>
			)}
		</div>
	);
};

export default DropzoneInput;
