import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormHelperText } from '@material-ui/core';

const SelectInput = ({
	input,
	options,
	name,
	label,
	defaultValue,
	meta: { touched, error },
}) => {
	const [category, setCategory] = React.useState('');

	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	return (
		<div>
			<FormControl fullWidth variant="outlined" error={touched && !!error}>
				<InputLabel id="select-input">{label}</InputLabel>
				<Select
					labelId="select-input"
					//input={<Input />}
					value={category}
					onChange={handleChange}
					label={label}
					defaultValue={defaultValue}
				>
					<MenuItem selected disabled value="">
						<em>Please choose one</em>
					</MenuItem>
					{options.map((option) => (
						<MenuItem key={option.key} value={option.value}>
							{option.text}
						</MenuItem>
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
