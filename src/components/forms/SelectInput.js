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
			<FormControl
				{...input}
				fullWidth
				variant="outlined"
				error={touched && !!error}
				name={name}
			>
				<InputLabel id="select-input">{label}</InputLabel>
				<Select
					labelId="select-input"
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
