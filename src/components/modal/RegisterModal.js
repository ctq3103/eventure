import React from 'react';
import { connect } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { closeModal } from '../../redux/modals/modal.actions';
import RegisterForm from '../auth/RegisterForm';

const mapDispatchToProps = { closeModal };

const RegisterModal = ({closeModal}) => {
  return (
      <Dialog open={true} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogContent>
          <RegisterForm />
        </DialogContent>      
      </Dialog>
  );
}

export default connect(null, mapDispatchToProps)(RegisterModal);
