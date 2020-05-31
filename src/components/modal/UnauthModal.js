import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModal, openModal } from '../../redux/modals/modal.actions';
import { Typography, Dialog, Button, Divider } from '@material-ui/core';

class UnauthModal extends Component {
	render() {
		const { openModal, closeModal } = this.props;
		return (
			<Dialog open={true} onClose={closeModal}>
				<Dialog.Content>
					<Typography>You need to be signed in to do that!</Typography>

					<Typography>
						Please either login or register to see this page
					</Typography>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => openModal('SignInModal')}
					>
						Sign In
					</Button>

					<Button
						variant="outlined"
						color="secondary"
						onClick={() => openModal('RegisterModal')}
					>
						Register
					</Button>
					<Divider />
					<Typography>Or click cancel to continue as a guest</Typography>
					<Button variant="contained" color="inherit" onClick={closeModal}>
						Cancel
					</Button>
				</Dialog.Content>
			</Dialog>
		);
	}
}

const mapDispatchToProps = { closeModal, openModal };

export default connect(null, mapDispatchToProps)(UnauthModal);
