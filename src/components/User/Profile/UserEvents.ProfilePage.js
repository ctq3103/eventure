import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserEventItem from './UserEventItem';
import { getUserEvents } from '../../../redux/user/user.actions';
import { CircularProgress } from '@material-ui/core';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(key) {
	return {
		id: `full-width-tab-${key}`,
		'aria-controls': `full-width-tabpanel-${key}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
	},
	tabs: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		marginBottom: theme.spacing(5),
	},
}));

const panes = [
	{ label: 'All Events', key: 'allEvents' },
	{ label: 'Past Events', key: 'pastEvents' },
	{ label: 'Future Events', key: 'futureEvents' },
	{ label: 'Own Events', key: 'ownEvents' },
];

const UserEvents = ({ events, loading, getUserEvents, userUid }) => {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		getUserEvents(userUid, newValue);
	};

	return (
		<div className={classes.root}>
			<Tabs
				value={value}
				onChange={handleChange}
				className={classes.tabs}
				indicatorColor="secondary"
				textColor="secondary"
				variant="fullWidth"
			>
				{panes.map((pane, index) => (
					<Tab key={index} label={pane.label} {...a11yProps(index)} />
				))}
			</Tabs>

			{panes.map((pane, index) => (
				<TabPanel value={value} index={index} key={index} dir={theme.direction}>
					{loading ? (
						<CircularProgress color="secondary" />
					) : (
						<Grid container justify="center" alignItems="stretch" spacing={2}>
							{events.length !== 0 ? (
								events.map(
									(event) =>
										typeof event.date.toDate === 'function' && (
											<Grid key={event.id} item xs={12} sm={6}>
												<UserEventItem event={event} />
											</Grid>
										)
								)
							) : (
								<Typography varianr="subtitle1">No event to show</Typography>
							)}
						</Grid>
					)}
				</TabPanel>
			))}
		</div>
	);
};

const mapDispatchToProps = {
	getUserEvents,
};

const mapStateToProps = (state) => {
	return {
		events: state.events.events,
		loading: state.async.loading,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEvents);
