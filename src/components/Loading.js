import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		position: 'fixed',
		zIndex: 999,
		margin: 'auto',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		width: '50px',
		height: '50px',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

export default function Loading() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress color="secondary" />
		</div>
	);
}
