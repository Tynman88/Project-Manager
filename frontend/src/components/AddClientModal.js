import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Set the app element
Modal.setAppElement('#root');

const AddClientModal = ({ isOpen, onRequestClose, onSubmit, initialClient }) => {
  const [client, setClient] = useState(initialClient || { name: '', email: '', phone: '' });

  useEffect(() => {
    setClient(initialClient || { name: '', email: '', phone: '' });
  }, [initialClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(client);
    setClient({ name: '', email: '', phone: '' });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Client"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="clientName">Name</label>
          <input
            type="text"
            id="clientName"
            name="name"
            className="form-control"
            placeholder="Enter client name"
            value={client.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientEmail">Email</label>
          <input
            type="email"
            id="clientEmail"
            name="email"
            className="form-control"
            placeholder="Enter client email"
            value={client.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientPhone">Phone</label>
          <input
            type="text"
            id="clientPhone"
            name="phone"
            className="form-control"
            placeholder="Enter client phone"
            value={client.phone}
            onChange={handleChange}
          />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
          <button type="submit" className="btn btn-primary">Add Client</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddClientModal;
