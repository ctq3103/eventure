import React from 'react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from '../../redux/events/events.actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Field, reduxForm } from 'redux-form';
import TextInput from '../forms/TextInput';
import SelectInput from '../forms/SelectInput';
import { Grid } from '@material-ui/core';
import {
	combineValidators,
	isRequired,
	composeValidators,
	hasLengthGreaterThan,
} from 'revalidate';
import DateTime from '../forms/DateTimePicker';

const validate = combineValidators({
	title: isRequired({ message: 'Event Title is required' }),
	description: composeValidators(
		isRequired({ message: 'Description is required' }),
		hasLengthGreaterThan(10)({
			message: 'Description needs to be at least 10 characters',
		})
	)(),
	venue: isRequired({ message: 'Event Venue is required' }),
});

const categories = [
	{ key: 'Business', text: 'Business & Professional', value: 'Business' },
	{ key: 'Charity', text: 'Charity & Causes', value: 'Charity' },
	{ key: 'Education', text: 'Education', value: 'Education' },
	{ key: 'Entertainment', text: 'Entertainment', value: 'Entertainment' },
	{ key: 'Health', text: 'Health & Wellness', value: 'Health' },
	{ key: 'Hobbies', text: 'Hobbies & Special Interests', value: 'Hobbies' },
];

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
		margin: theme.spacing(2),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: 'auto', // Fix IE 11 issue.
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const EventForm = ({ invalid, submitting, pristine, initialValues }) => {
	const classes = useStyles();
	// console.log(initialValues);
	// const [eventManage] = useState(event);
	//const { title, venue, description, category } = initialValues;

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<CreateIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Event Form
				</Typography>
				<form className={classes.form} autoComplete="off">
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Field
								component={TextInput}
								required
								id="title"
								label="Event Title"
								name="title"
								autoFocus
								//defaultValue={title}
							/>
						</Grid>

						<Grid item xs={12}>
							<Field
								component={SelectInput}
								options={categories}
								required
								name="category"
								label="Event Category"
								type="category"
								id="category"
								//defaultValue={category}
							/>
						</Grid>

						<Grid item xs={12}>
							<Field
								component={TextInput}
								required
								name="description"
								label="Event Description"
								type="description"
								id="description"
								multiline
								rowsMax={50}
								//defaultValue={description}
							/>
						</Grid>

						<Grid item xs={12}>
							<Field
								component={DateTime}
								required
								name="dateTime"
								label="Date & Time"
								type="dateTime"
								id="dateTime"
							/>
						</Grid>

						<Grid item xs={12}>
							<Field
								component={TextInput}
								required
								name="venue"
								label="Venue"
								type="venue"
								id="venue"
								//defaultValue={venue}
							/>
						</Grid>
					</Grid>
					{/* {authError && (
						<Typography variant="subtitle2" color="primary">
							{authError.message}
						</Typography>
					)} */}
					<Button
						disabled={invalid || submitting}
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						className={classes.submit}
					>
						Submit
					</Button>
					<Button
						disabled={invalid || submitting}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Update
					</Button>
				</form>
			</div>
		</Container>
	);
};

const mapDispatchToProps = {
	createEvent,
	updateEvent,
};

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;

	let event;

	if (eventId && state.events.length > 0) {
		event = state.events.filter((event) => event.id === eventId)[0];
	}
	return {
		initialValues: event,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	reduxForm({ form: 'EventForm', validate, enableReinitialize: true })(
		EventForm
	)
);
