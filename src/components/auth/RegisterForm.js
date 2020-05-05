import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextInput from '../forms/TextInput';
import { Field, reduxForm } from 'redux-form';
import { registerStart } from '../../redux/auth/auth.actions';
import { combineValidators, isRequired } from 'revalidate';
import { selectAuthError } from '../../redux/auth/auth.selectors';

const mapDispatchToProps = {
	registerStart,
};

const mapStateToProps = createStructuredSelector({
	authError: selectAuthError,
});

const validate = combineValidators({
	displayName: isRequired('Name'),
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
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function RegisterForm({
	handleSubmit,
	registerStart,
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
					Sign up
				</Typography>

				<form
					className={classes.form}
					autoComplete="off"
					onSubmit={handleSubmit(registerStart)}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Field
								component={TextInput}
								name="displayName"
								required
								id="displayName"
								label="Known As"
								autoFocus
							/>
						</Grid>

						<Grid item xs={12}>
							<Field
								component={TextInput}
								required
								id="email"
								label="Email Address"
								name="email"
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
						{/* <Grid item xs={12}>
							<Field
								component={TextInput}
								required
								name="confirm password"
								label="Confirm Password"
								type="password"
								id="confirm-password"
							/>
						</Grid> */}
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
						Sign Up
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	reduxForm({
		form: 'registerForm',
		validate,
	})(RegisterForm)
);
