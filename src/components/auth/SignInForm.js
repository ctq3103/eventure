import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Field, reduxForm } from 'redux-form';
import TextInput from '../forms/TextInput';
import {
	emailSignInStart,
	socialSignInStart,
} from '../../redux/auth/auth.actions';
import { Grid, Divider } from '@material-ui/core';
import { combineValidators, isRequired } from 'revalidate';
import { indigo, red } from '@material-ui/core/colors';
import SocialSignInForm from './SocialSignInForm';
import { selectAuthError } from '../../redux/auth/auth.selectors';

const mapDispatchToProps = {
	emailSignInStart,
	socialSignInStart,
};

const mapStateToProps = createStructuredSelector({
	authError: selectAuthError,
});

const validate = combineValidators({
	email: isRequired('Email'),
	password: isRequired('Password'),
});

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: theme.palette.text.primary,
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
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
		color: theme.palette.getContrastText(red[600]),
		backgroundColor: red[600],
		'&:hover': {
			backgroundColor: red[900],
		},
	},
}));

function SignInForm({
	emailSignInStart,
	socialSignInStart,
	handleSubmit,
	authError,
	invalid,
	submitting,
}) {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form
					className={classes.form}
					onSubmit={handleSubmit(emailSignInStart)}
					autoComplete="off"
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Field
								component={TextInput}
								required
								id="email"
								label="Email Address"
								name="email"
								autoFocus
							/>
						</Grid>

						<Grid item xs={12}>
							<Field
								component={TextInput}
								required
								name="password"
								label="Password"
								type="password"
								id="password"
							/>
						</Grid>
					</Grid>
					{authError && (
						<Typography variant="subtitle2" color="primary">
							{authError.message}
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
						Sign In
					</Button>
				</form>
				<Divider variant="middle" />
				<SocialSignInForm socialSignInStart={socialSignInStart} />
			</div>
		</Container>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({ form: 'signInForm', validate })(SignInForm));
