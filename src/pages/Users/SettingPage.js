import React from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FaceIcon from '@material-ui/icons/Face';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Account from '../../components/User/Settings/Account';
import { updatePasswordStart } from '../../redux/auth/auth.actions';
import { updateProfile } from '../../redux/user/user.actions';
import PersonalInfo from '../../components/User/Settings/PersonalInfo';
import ProfilePicture from '../../components/User/Settings/ProfilePicture';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		height: 350,
		margin: theme.spacing(6),
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	tab: {
		padding: '50px',
		width: '250px',
	},
	tabPanel: {
		marginLeft: theme.spacing(8),
		maxWidth: '400px',
	},
}));

const mapDispatchToProps = {
	updatePasswordStart,
	updateProfile,
};

const mapStateToProps = (state) => ({
	accError: state.auth.accError,
	providerId: state.firebase.auth.providerData[0].providerId,
});

const SettingPage = ({
	updateProfile,
	updatePasswordStart,
	accError,
	providerId,
}) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Tabs
				orientation="vertical"
				textColor="secondary"
				variant="fullWidth"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				className={classes.tabs}
			>
				<Tab
					className={classes.tab}
					label="Personal Info"
					icon={<FaceIcon />}
					{...a11yProps(0)}
				/>
				<Tab
					className={classes.tab}
					label="Profile Picture"
					icon={<PhotoCameraIcon />}
					{...a11yProps(1)}
				/>
				<Tab
					className={classes.tab}
					label="My Account"
					icon={<SettingsApplicationsIcon />}
					{...a11yProps(2)}
				/>
			</Tabs>
			<TabPanel value={value} index={0} className={classes.tabPanel}>
				<PersonalInfo updateProfile={updateProfile} />
			</TabPanel>
			<TabPanel value={value} index={1} variant="fullWidth">
				<ProfilePicture />
			</TabPanel>
			<TabPanel value={value} index={2} className={classes.tabPanel}>
				<Account
					updatePassword={updatePasswordStart}
					accError={accError}
					providerId={providerId}
				/>
			</TabPanel>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
