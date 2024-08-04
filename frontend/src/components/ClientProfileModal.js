import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { fetchChangeLogs, fetchClientProjects } from '../services/api';
import ProjectDetailModal from './ProjectDetailModal';
import './Modal.css';

// Set the app element
Modal.setAppElement('#root');

const ClientProfileModal = ({ isOpen, onRequestClose, client }) => {
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [changeLogs, setChangeLogs] = useState([]);

  useEffect(() => {
    if (client && client.id) {
      const getProjects = async () => {
        try {
          const data = await fetchClientProjects(client.id);
          setProjects(data);
        } catch (error) {
          console.error(error);
        }
      };
      const getChangeLogs = async () => {
        try {
          const data = await fetchChangeLogs(client.id, 'Client');
          setChangeLogs(data);
        } catch (error) {
          console.error(error);
        }
      };
      getProjects();
      getChangeLogs();
    }
  }, [client]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
    onRequestClose();  // Close the client profile modal
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Client Profile"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Client Profile</h2>
        {client && (
          <div>
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>

            <h3>Projects</h3>
            {projects.length > 0 ? (
              <table className="project-table table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project.id} onClick={() => openProjectModal(project)} style={{ cursor: 'pointer' }}>
                      <td>{project.name}</td>
                      <td>{project.startDate}</td>
                      <td>{project.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No projects found for this client.</p>
            )}

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
              <p>No changes recorded for this client.</p>
            )}
          </div>
        )}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
        </div>
      </Modal>
      <ProjectDetailModal
        isOpen={isProjectModalOpen}
        onRequestClose={() => setIsProjectModalOpen(false)}
        project={selectedProject}
        client={client}
      />
    </div>
  );
};

export default ClientProfileModal;
