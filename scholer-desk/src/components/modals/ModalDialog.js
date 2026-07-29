import React from 'react';
import AppButton from '../buttons/AppButton';
import './ModalDialog.css';

function ModalDialog({ title, message, primary = 'Confirm', secondary = 'Cancel', onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <AppButton variant="outline" onClick={onCancel}>{secondary}</AppButton>
          <AppButton onClick={onConfirm}>{primary}</AppButton>
        </div>
      </div>
    </div>
  );
}

export default ModalDialog;