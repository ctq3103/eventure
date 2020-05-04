import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { indigo, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	facebookButton: {
		margin: theme.spacing(3, 0, 2),
		color: theme.palette.getContrastText(indigo[600]),
		backgroundColor: indigo[600],
		'&:hover': {
			backgroundColor: indigo[900],
		},
	},
	googleButton: {
		color: theme.palette.getContrastText(red[600]),
		backgroundColor: red[600],
		'&:hover': {
			backgroundColor: red[900],
		},
	},
}));

function SocialSignInForm({ socialSignInStart }) {
	const classes = useStyles();

	return (
		<div>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				className={classes.facebookButton}
				onClick={() => socialSignInStart('facebook')}
			>
				Sign In With Facebook
			</Button>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				className={classes.googleButton}
				onClick={() => socialSignInStart('google')}
			>
				Sign In With Google
			</Button>
		</div>
	);
}

export default SocialSignInForm;
