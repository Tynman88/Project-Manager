import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetchClients, createClient } from '../services/api';
import AddClientModal from './AddClientModal';
import './Modal.css';

// Set the app element
Modal.setAppElement('#root');

const AddProjectModal = ({ isOpen, onRequestClose, onSubmit, project, setProject, isEditing }) => {
  const [clients, setClients] = useState([]);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        console.error(error);
      }
    };
    getClients();
  }, []);

  useEffect(() => {
    if (project) {
      setProject(project);
    } else {
      setProject({ name: '', client: '', startDate: '', endDate: '', description: '' });
    }
  }, [project, setProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleClientSubmit = async (client) => {
    try {
      const createdClient = await createClient(client);
      setClients([...clients, createdClient]);
      setProject((prevProject) => ({ ...prevProject, client: createdClient.name }));
      setIsClientModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openClientModal = () => {
    setIsClientModalOpen(true);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={isEditing ? "Edit Project" : "Add New Project"}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>{isEditing ? "Edit Project" : "Add New Project"}</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Name</label>
            <input
              type="text"
              id="projectName"
              name="name"
              className="form-control"
              placeholder="Enter project name"
              value={project?.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectClient">Client</label>
            <div className="d-flex">
              <select
                id="projectClient"
                name="client"
                className="form-control"
                value={project?.client || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={openClientModal}
              >
                Add Client
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="projectStartDate">Start Date</label>
            <input
              type="date"
              id="projectStartDate"
              name="startDate"
              className="form-control"
              value={project?.startDate || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectEndDate">End Date</label>
            <input
              type="date"
              id="projectEndDate"
              name="endDate"
              className="form-control"
              value={project?.endDate || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Description</label>
            <textarea
              id="projectDescription"
              name="description"
              className="form-control"
              placeholder="Enter project description"
              value={project?.description || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Save Changes" : "Add Project"}
            </button>
          </div>
        </form>
      </Modal>
      <AddClientModal
        isOpen={isClientModalOpen}
        onRequestClose={() => setIsClientModalOpen(false)}
        onSubmit={handleClientSubmit}
        initialClient={{ name: '', email: '', phone: '' }}
      />
    </div>
  );
};

export default AddProjectModal;
