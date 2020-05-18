import React from 'react';
import { connect } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
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
	hasLengthLessThan,
} from 'revalidate';
import DateTimeInput from '../forms/DateTimePicker';
import {
	createEvent,
	updateEvent,
	deleteEvent,
} from '../../redux/events/events.actions';

const validate = combineValidators({
	title: composeValidators(
		isRequired({ message: 'Event Title is required' }),
		hasLengthLessThan(50)({
			message: 'Event title needs to be less than 50 characters',
		})
	)(),
	description: composeValidators(
		isRequired({ message: 'Description is required' }),
		hasLengthGreaterThan(10)({
			message: 'Description needs to be at least 10 characters',
		})
	)(),
	venue: isRequired({ message: 'Event Venue is required' }),
});

const categories = [
	{
		key: 'Business',
		text: 'Business & Professional',
		value: 'Business & Professional',
	},
	{ key: 'Charity', text: 'Charity & Causes', value: 'Charity & Causes' },
	{ key: 'Education', text: 'Education', value: 'Education' },
	{ key: 'Entertainment', text: 'Entertainment', value: 'Entertainment' },
	{ key: 'Health', text: 'Health & Wellness', value: 'Health & Wellness' },
	{
		key: 'Hobbies',
		text: 'Hobbies & Special Interests',
		value: 'Hobbies & Special Interests',
	},
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
		marginTop: theme.spacing(3),
	},
}));

const EventForm = ({
	handleSubmit,
	invalid,
	submitting,
	pristine,
	initialValues,
	dispatch,
	history,
	updateEvent,
	createEvent,
}) => {
	const classes = useStyles();
	useFirestoreConnect([{ collection: 'events' }]);

	const onFormSubmit = async (values) => {
		if (initialValues && initialValues.id) {
			await updateEvent(values);
			history.push(`/event/${initialValues.id}`);
		} else {
			//let createdEvent = await createEvent(values);
			// console.log('createdEvent', createdEvent);
			await createEvent(values);
		}
	};

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<CreateIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Event Form
				</Typography>
				<form
					onSubmit={handleSubmit(onFormSubmit)}
					className={classes.form}
					autoComplete="off"
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Field
								component={TextInput}
								required
								id="title"
								label="Event Title"
								name="title"
								autoFocus
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
							/>
						</Grid>

						<Grid item xs={12}>
							<Field
								component={DateTimeInput}
								required
								disablePast
								name="date"
								id="date"
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
							/>
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<Button
							disabled={invalid || submitting || pristine}
							type="submit"
							variant="contained"
							color="secondary"
							className={classes.submit}
						>
							Submit
						</Button>
					</Grid>

					{initialValues && (
						<Grid item xs={12}>
							<Button
								fullWidth
								className={classes.submit}
								variant="contained"
								color="inherit"
								onClick={
									initialValues.id
										? () => history.push(`/event/${initialValues.id}`)
										: () => history.push('/events')
								}
							>
								Cancel
							</Button>
						</Grid>
					)}
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

	if (
		eventId &&
		state.firestore.ordered.events &&
		state.firestore.ordered.events.length > 0
	) {
		event = state.firestore.ordered.events.filter(
			(event) => event.id === eventId
		)[0];
	}
	return {
		initialValues: event,
		event,
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
