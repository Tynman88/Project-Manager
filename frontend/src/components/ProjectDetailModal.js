import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { fetchChangeLogs } from '../services/api';
import './Modal.css';

// Set the app element
Modal.setAppElement('#root');

const ProjectDetailModal = ({ isOpen, onRequestClose, project, client, openClientProfile }) => {
  const [changeLogs, setChangeLogs] = useState([]);

  useEffect(() => {
    if (project && project.id) {
      const getChangeLogs = async () => {
        try {
          const data = await fetchChangeLogs(project.id, 'Project');
          setChangeLogs(data);
        } catch (error) {
          console.error(error);
        }
      };
      getChangeLogs();
    }
  }, [project]);

  const handleClientClick = () => {
    onRequestClose();  // Close the project detail modal
    openClientProfile();  // Call the function to open the client profile
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Project Details"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Project Details</h2>
      {project && (
        <div>
          <p><strong>Name:</strong> {project.name}</p>
          <p><strong>Client:</strong> <button className="link-button" onClick={handleClientClick}>{client?.name}</button></p>
          <p><strong>Start Date:</strong> {project.startDate}</p>
          <p><strong>End Date:</strong> {project.endDate}</p>
          <p><strong>Description:</strong> {project.description}</p>
          <h3>Change Log</h3>
          {changeLogs.length > 0 ? (
            <ul>
              {changeLogs.map(log => (
                <li key={log.id}>
                  <p>{log.change}</p>
                  <small>{new Date(log.timestamp).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No changes recorded for this project.</p>
          )}
        </div>
      )}
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
};

export default ProjectDetailModal;
