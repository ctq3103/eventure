import React from 'react';
import 'date-fns';
import { DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const DateTimeInput = (props) => {
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
			<DateTimePicker
				{...inputProps}
				{...others}
				autoOk
				fullWidth
				label="Choose Date and Time"
				inputVariant="outlined"
				format="dd LLLL yyyy, h:mm aaa OOO"
				value={value ? new Date(value) : null}
				disabled={submitting}
				onBlur={() => onBlur(value ? new Date(value) : null)}
				error={error && touched}
				onChange={onChange}
			/>
		</MuiPickersUtilsProvider>
	);
};

export default DateTimeInput;
