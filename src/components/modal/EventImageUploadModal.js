import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { closeModal } from '../../redux/modals/modal.actions';
import EventImageUpload from '../Events/EventDetails/ImageProcessing/EventImageUpload';

const mapDispatchToProps = { closeModal };

const EventImageUploadModal = ({ closeModal }) => {
	return (
		<Dialog
			maxWidth="md"
			open={true}
			onClose={closeModal}
			aria-labelledby="signIn-form-modal"
		>
			<DialogContent>
				<EventImageUpload />
			</DialogContent>
		</Dialog>
	);
};

export default connect(null, mapDispatchToProps)(EventImageUploadModal);
