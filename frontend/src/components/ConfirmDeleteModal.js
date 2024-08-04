import React from 'react';
import Modal from 'react-modal';

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Delete"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this project?</p>
      <button onClick={onConfirm}>Yes, delete it</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
