import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			width: '100%',
			height: theme.spacing(25),
		},
	},
	info: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(3),
		width: theme.spacing(15),
		height: theme.spacing(15),
	},
}));

const UserInfo = ({ profile }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper variant="outlined" className={classes.info}>
				{profile.photoURL && (
					<Avatar
						alt={profile.displayName}
						src={profile.photoURL}
						className={classes.avatar}
					/>
				)}

				<Typography color="inherit" variant="h6">
					{profile.displayName}
				</Typography>
			</Paper>
		</div>
	);
};

export default UserInfo;
