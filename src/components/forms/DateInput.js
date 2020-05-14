import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DateInput({ input, name, label, maxDate }) {
	// The first commit of Material-UI
	const [selectedDate, setSelectedDate] = React.useState(
		new Date('2000-01-01T21:11:54')
	);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					{...input}
					name={name}
					label={label}
					maxDate={maxDate}
					disableToolbar
					fullWidth
					variant="inline"
					inputVariant="outlined"
					format="dd LLL yyyy"
					margin="normal"
					id="date-picker-inline"
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
}
