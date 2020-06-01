import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(10),
		color: theme.palette.text.secondary,
	},
	typography: {
		marginBottom: theme.spacing(10),
	},
}));

const NotFound = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid container justify="center" alignItems="center">
				<Typography variant="h3" color="inherit">
					404 PAGE NOT FOUND
				</Typography>
			</Grid>
		</div>
	);
};

export default NotFound;
