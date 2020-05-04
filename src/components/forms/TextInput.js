import React from 'react';
import { TextField, Typography } from '@material-ui/core';

const TextInput = ({
	input,
	id,
	name,
	label,
	helperText,
	type,
	meta: { touched, error },
	...rest
}) => {
	return (
		<div>
			<TextField
				{...input}
				id={id}
				variant="outlined"
				margin="normal"
				fullWidth
				label={label}
				name={name}
				type={type}
				error={touched && !!error}
				helperText={touched && !!error && helperText}
			/>
			{touched && error && (
				<Typography variant="subtitle2" color="primary">
					{error}
				</Typography>
			)}
		</div>
	);
};

export default TextInput;
