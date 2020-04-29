import React from 'react';
import { connect } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SignInForm from '../auth/SignInForm';
import { closeModal } from '../../redux/modals/modal.actions';

const mapDispatchToProps = { closeModal };

const SignInModal = ({closeModal}) => {
  return (
      <Dialog open={true} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogContent>
          <SignInForm />
        </DialogContent>      
      </Dialog>
  );
}

export default connect(null, mapDispatchToProps)(SignInModal);
