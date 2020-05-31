import React from 'react';
import { connect } from 'react-redux';
import SignInModal from './SignInModal';
import RegisterModal from './RegisterModal';
import UnauthModal from './UnauthModal';

const modalLookup = {
	SignInModal,
	RegisterModal,
	UnauthModal,
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
