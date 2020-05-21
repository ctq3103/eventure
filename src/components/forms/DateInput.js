import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

const DateInput = (props) => {
	const {
		meta: { submitting, error, touched },
		input: { onBlur, value, ...inputProps },
		...others
	} = props;

	const onChange = (date) => {
		Date.parse(date) ? inputProps.onChange(date) : inputProps.onChange(null);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					{...inputProps}
					{...others}
					autoOk
					label="Choose Date"
					fullWidth
					inputVariant="outlined"
					format="dd LLL yyy"
					value={value ? new Date(value) : null}
					disabled={submitting}
					onBlur={() => onBlur(value ? new Date(value) : null)}
					error={error && touched}
					onChange={onChange}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
};

export default DateInput;
