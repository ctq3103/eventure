import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
	combineValidators,
	matchesField,
	isRequired,
	composeValidators,
} from 'revalidate';
import { makeStyles, Typography, Button } from '@material-ui/core';
import TextInput from '../../forms/TextInput';
import { indigo, red } from '@material-ui/core/colors';

const validate = combineValidators({
	password: isRequired({ message: 'Please enter a password' }),
	confirmPassword: composeValidators(
		isRequired({ message: 'Please confirm your new password' }),
		matchesField('password')({ message: 'Passwords do not match' })
	)(),
});

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	facebookButton: {
		margin: theme.spacing(3, 0, 2),
		color: theme.palette.getContrastText(indigo[600]),
		backgroundColor: indigo[600],
		'&:hover': {
			backgroundColor: indigo[900],
		},
	},
	googleButton: {
		margin: theme.spacing(3, 0, 2),
		color: theme.palette.getContrastText(red[600]),
		backgroundColor: red[600],
		'&:hover': {
			backgroundColor: red[900],
		},
	},
}));

const Account = ({
	accError,
	providerId,
	invalid,
	submitting,
	handleSubmit,
	updatePassword,
}) => {
	const classes = useStyles();

	return (
		<div>
			{providerId && providerId === 'password' && (
				<div>
					<Typography variant="subtitle1">Update your password</Typography>
					<form
						className={classes.form}
						onSubmit={handleSubmit(updatePassword)}
						autoComplete="off"
					>
						<Field
							name="password"
							label="New Password"
							type="password"
							id="password"
							component={TextInput}
						/>
						<Field
							id="confirm password"
							name="confirmPassword"
							type="password"
							component={TextInput}
							label="Confirm Password"
						/>
						{accError && (
							<Typography variant="subtitle1" color="primary">
								{accError.message}
							</Typography>
						)}

						<Button
							disabled={invalid || submitting}
							type="submit"
							fullWidth
							variant="contained"
							color="secondary"
							className={classes.submit}
						>
							Update Password
						</Button>
					</form>
				</div>
			)}

			{providerId && providerId === 'facebook.com' && (
				<div>
					<Typography variant="subtitle1" style={{ marginTop: '20px' }}>
						Please visit Facebook to update your account settings
					</Typography>
					<Button
						fullWidth
						variant="contained"
						className={classes.facebookButton}
					>
						Go To Facebook
					</Button>
				</div>
			)}

			{providerId && providerId === 'google.com' && (
				<div>
					<Typography variant="subtitle1" style={{ marginTop: '20px' }}>
						Please visit Google to update your account settings
					</Typography>
					<Button
						fullWidth
						variant="contained"
						className={classes.googleButton}
					>
						Go To Google
					</Button>
				</div>
			)}
		</div>
	);
};

export default reduxForm({ form: 'account', validate })(Account);
