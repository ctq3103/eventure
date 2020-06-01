import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid, Divider, withStyles } from '@material-ui/core';
import UserEvents from '../../components/User/Profile/UserEvents.ProfilePage';
import UserInfo from '../../components/User/Profile/UserInfo.ProfilePage';
import { getUserEvents } from '../../redux/user/user.actions';
import Loading from '../../components/Loading';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		margin: theme.spacing(10),
		color: theme.palette.text.secondary,
	},
});

class ProfilePage extends React.Component {
	componentDidMount() {
		const { userUid, getUserEvents, auth } = this.props;
		if (!auth.uid) {
			return;
		} else {
			getUserEvents(userUid);
		}
	}

	render() {
		const { classes, profile, userUid, events, requesting } = this.props;

		const isRequesting = Object.values(requesting).some(
			(data) => data === true
		);
		if (isRequesting) return <Loading />;

		return (
			<div className={classes.root}>
				<UserInfo profile={profile} />
				<Divider variant="middle" />

				<Grid container spacing={3} style={{ marginTop: '50px' }}>
					<Grid item xs={12} sm={8}>
						<UserEvents userUid={userUid} events={events} />
					</Grid>
					{/* <Grid item xs={12} sm={4}>
         <Follow/>
       </Grid> */}
				</Grid>
			</div>
		);
	}
}

const mapDispatchToProps = {
	getUserEvents,
};

const mapStateToProps = (state, ownProps) => {
	let userUid = ownProps.match.params.id;
	let profile = {};

	if (ownProps.match.params.id === state.auth.currentUser.user.uid) {
		profile = state.firebase.profile;
	} else {
		profile =
			!isEmpty(state.firestore.ordered.users) &&
			state.firestore.ordered.users.filter(
				(user) => user.id === ownProps.match.params.id
			)[0];
	}

	return {
		profile,
		userUid,
		auth: state.firebase.auth,
		loading: state.async.loading,
		events: state.events.events,
		requesting: state.firestore.status.requesting,
	};
};

export default compose(
	withStyles(styles, { withTheme: true }),
	firestoreConnect(() => ['users'])
)(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
