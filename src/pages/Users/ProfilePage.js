import React from 'react';
import { connect } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { Grid, Divider, makeStyles } from '@material-ui/core';
import UserEvents from '../../components/User/Profile/UserEvents.ProfilePage';
import UserInfo from '../../components/User/Profile/UserInfo.ProfilePage';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: theme.spacing(10),
		color: theme.palette.text.secondary,
	},
}));

const ProfilePage = ({ events, profile }) => {
	const classes = useStyles();
	useFirestoreConnect([{ collection: 'events' }]);

	return (
		<div className={classes.root}>
			<UserInfo profile={profile} />
			<Divider variant="middle" />
			<Grid container spacing={3} style={{ marginTop: '50px' }}>
				<Grid item xs={12} sm={8}>
					<UserEvents />
				</Grid>
				{/* <Grid item xs={12} sm={4}>
         <Follow/>
       </Grid> */}
			</Grid>
		</div>
	);
};

const mapStateToProps = (state) => ({
	events: state.firestore.ordered.events,
	profile: state.firebase.profile,
});

export default connect(mapStateToProps)(ProfilePage);
