import React from 'react';
import { connect } from 'react-redux';
import SignInModal from './SignInModal';
import RegisterModal from './RegisterModal';
import EventImageUploadModal from './EventImageUploadModal';

const modalLookup = {
	SignInModal,
	RegisterModal,
	EventImageUploadModal,
};

const mapStateToProps = (state) => ({
	currentModal: state.modal,
});

const ModalManager = ({ currentModal }) => {
	let renderedModal;

	if (currentModal) {
		const { type, props } = currentModal;
		const ModalComponent = modalLookup[type];

		renderedModal = <ModalComponent {...props} />;
	}

	return <span>{renderedModal}</span>;
};

export default connect(mapStateToProps)(ModalManager);
