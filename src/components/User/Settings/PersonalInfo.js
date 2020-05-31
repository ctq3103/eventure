import React from 'react';
import { addYears } from 'date-fns';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../forms/TextInput';
import RadioInput from '../../forms/RadioInput';
import DateInput from '../../forms/DateInput';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const gender = [
	{ key: 'male', value: 'Male', label: 'Male' },
	{ key: 'female', value: 'Female', label: 'Female' },
	{ key: 'lgbt', value: 'LGBT', label: 'LGBT' },
];

const PersonalInfo = ({
	pristine,
	submitting,
	updateProfile,
	handleSubmit,
}) => {
	const classes = useStyles();
	return (
		<div>
			<form
				className={classes.form}
				onSubmit={handleSubmit(updateProfile)}
				autoComplete="off"
			>
				<Field
					id="displayName"
					name="displayName"
					type="text"
					component={TextInput}
					label="Known As"
				/>
				<Field
					id="gender"
					component={RadioInput}
					options={gender}
					legend="Gender"
					name="gender"
				/>
				<Field
					id="birthday"
					component={DateInput}
					name="birthday"
					placeholder="01 Jan 2002"
					maxDate={addYears(new Date(), -18)}
				/>

				<Field
					name="location"
					label="Location"
					id="location"
					type="text"
					component={TextInput}
				/>
				<Button
					disabled={pristine || submitting}
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					className={classes.submit}
				>
					Update Profile
				</Button>
			</form>
		</div>
	);
};

export default reduxForm({ form: 'userProfile', enableReinitialize: true })(
	PersonalInfo
);
