import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useFirebase } from 'react-redux-firebase';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import MoreIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { openModal } from '../../redux/modals/modal.actions';
import FavoriteIconNav from './FavoriteIconNav';
import { Avatar } from '@material-ui/core';

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile,
});

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
		color: theme.palette.text.primary,
	},
	button: {
		margin: theme.spacing(1),
	},
	title: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
		textDecoration: 'none',
		cursor: 'pointer',
	},

	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
}));

function Header({ history, auth, profile, dispatch }) {
	const firebase = useFirebase();
	const authenticated = auth.isLoaded && !auth.isEmpty;

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleSignIn = () => {
		dispatch(openModal('SignInModal'));
	};

	const handleRegister = () => {
		dispatch(openModal('RegisterModal'));
	};

	const handleSignOut = () => {
		firebase.logout();
		history.push('/');
		handleMenuClose();
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem component={NavLink} to={`/profile/${auth.uid}`}>
				Profile
			</MenuItem>
			<MenuItem component={NavLink} exact to="/settings">
				Settings
			</MenuItem>
			<Divider />
			<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{authenticated ? (
				<div>
					<MenuItem component={NavLink} exact to="/createEvent">
						<IconButton color="inherit">
							<CreateIcon />
						</IconButton>
						<p>Create Event</p>
					</MenuItem>
					<MenuItem>
						<IconButton color="inherit">
							<FavoriteIconNav auth={auth} />
						</IconButton>
						<p>Favorites</p>
					</MenuItem>

					<MenuItem onClick={handleProfileMenuOpen}>
						<Button
							onClick={() => history.push(`/profile/${auth.uid}`)}
							aria-label="account of current user"
							aria-controls="primary-search-account-menu"
							aria-haspopup="true"
							color="inherit"
						>
							{profile.photoURL &&
							profile.photoURL !== '/static/media/user.666893a2.png' ? (
								<Avatar alt={profile.displayName} src={profile.photoURL} />
							) : (
								<AccountCircle />
							)}
						</Button>
						<p> Profile</p>
					</MenuItem>
				</div>
			) : (
				<div>
					<MenuItem>
						<Button color="inherit" onClick={handleSignIn}>
							Sign In
						</Button>
					</MenuItem>
					<MenuItem>
						<Button color="inherit" onClick={handleRegister}>
							Register
						</Button>
					</MenuItem>
				</div>
			)}
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar color="transparent" position="static">
				<Toolbar>
					<Typography
						color="primary"
						className={classes.title}
						variant="h4"
						noWrap
						component={NavLink}
						to="/"
					>
						eventure
					</Typography>

					<div className={classes.grow} />

					<Button
						color="inherit"
						component={NavLink}
						exact
						to="/events"
						className={classes.button}
					>
						Browse Events
					</Button>

					<div className={classes.sectionDesktop}>
						{authenticated ? (
							<div>
								<Button
									variant="outlined"
									color="secondary"
									component={NavLink}
									to="/createEvent"
									className={classes.button}
								>
									Create Event
								</Button>
								<Tooltip title="Favorites">
									<IconButton
										color="inherit"
										component={NavLink}
										exact
										to="/favorites"
										className={classes.button}
									>
										<FavoriteIconNav auth={auth} />
									</IconButton>
								</Tooltip>

								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									{profile.photoURL ? (
										<Avatar alt={profile.displayName} src={profile.photoURL} />
									) : (
										<AccountCircle />
									)}
								</IconButton>
							</div>
						) : (
							<div>
								<Button
									className={classes.button}
									variant="outlined"
									color="primary"
									onClick={handleSignIn}
								>
									Sign In
								</Button>
								<Button
									className={classes.button}
									variant="outlined"
									color="secondary"
									onClick={handleRegister}
								>
									Register
								</Button>
							</div>
						)}
					</div>

					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}

export default withRouter(connect(mapStateToProps)(Header));
