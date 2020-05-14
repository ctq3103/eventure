import React, { useState } from 'react';
import 'date-fns';
import { DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const DateTime = ({ input, ...rest }) => {
	const [selectedDate, handleDateChange] = useState(new Date());

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DateTimePicker
				disablePast
				fullWidth
				format="MM LLL yyyy h:mm a"
				label="Date and Time"
				inputVariant="outlined"
				value={selectedDate}
				onChange={handleDateChange}
			/>
		</MuiPickersUtilsProvider>
	);
};

export default DateTime;
