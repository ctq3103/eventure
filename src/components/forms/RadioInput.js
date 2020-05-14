import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	radio: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
}));

export default function RadioInput({ input, options, legend }) {
	const classes = useStyles();

	const [groupValue, setValue] = React.useState(options[0].value);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<div className={classes.radio}>
			<FormControl component="fieldset">
				<FormLabel component="legend">{legend}</FormLabel>
				<RadioGroup
					aria-label="gender"
					name="gender1"
					value={groupValue}
					onChange={handleChange}
					{...input}
				>
					{options.map((option) => (
						<FormControlLabel
							value={option.value}
							control={<Radio />}
							label={option.label}
							key={option.key}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</div>
	);
}
