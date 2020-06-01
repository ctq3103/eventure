import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal, openModal } from '../../redux/modals/modal.actions';
import {
	Typography,
	Dialog,
	Button,
	Divider,
	DialogContent,
	Container,
	Avatar,
	CssBaseline,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: theme.palette.text.primary,
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	submit: {
		margin: theme.spacing(1, 0, 1),
	},
}));

const RedirectModal = ({ openModal, closeModal, history }) => {
	const handleCancel = () => {
		closeModal();
		history.push('/events');
	};

	const classes = useStyles();
	return (
		<Dialog
			open={true}
			onClose={closeModal}
			aria-labelledby="redirect-form-modal"
		>
			<DialogContent>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>

						<Typography variant="subtitle1">
							Please either login or register to see this page
						</Typography>

						<Button
							className={classes.submit}
							variant="outlined"
							color="primary"
							fullWidth
							onClick={() => openModal('SignInModal')}
						>
							Sign In
						</Button>

						<Button
							className={classes.submit}
							fullWidth
							variant="outlined"
							color="secondary"
							onClick={() => openModal('RegisterModal')}
						>
							Register
						</Button>

						<Divider variant="middle" />
						<Typography>Or continue as a guest</Typography>
						<Button
							fullWidth
							variant="contained"
							color="inherit"
							onClick={handleCancel}
							className={classes.submit}
						>
							Cancel
						</Button>
					</div>
				</Container>
			</DialogContent>
		</Dialog>
	);
};

const mapDispatchToProps = { closeModal, openModal };

export default withRouter(connect(null, mapDispatchToProps)(RedirectModal));
