import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const SelectInput = ({
	input,
	options,
	name,
	label,
	meta: { touched, error },
	...rest
}) => {
	const classes = useStyles();

	return (
		<div>
			<FormControl
				variant="outlined"
				className={classes.formControl}
				error={touched && !!error}
			>
				<InputLabel id="select-input">{label}</InputLabel>
				<Select
					labelId="select-input"
					value={input.value}
					onChange={(e, data) => input.onChange(data.value)}
					label={label}
				>
					{options.map((option) => (
						<MenuItem value={option.key}>{option.text}</MenuItem>
					))}
				</Select>
			</FormControl>
			{touched && error && <FormHelperText>{error}</FormHelperText>}
		</div>
	);
};

export default SelectInput;

// const category = [
//     {key: 'charity', text: "Charity & Causes"},
//     {key: 'business', text: "Business & Professional"},
//     {key: 'education', text: "Education"},
//     {key: 'entertainment', text: "Entertainment"},
//     {key: 'health', text: "Health & Wellness"},
//     {key: 'hobbies', text: "Hobbies & Special Interests"}
// ]
