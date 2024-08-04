import React, { useState, useEffect } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject, fetchClient } from '../services/api';
import AddProjectModal from './AddProjectModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ProjectDetailModal from './ProjectDetailModal';
import ClientProfileModal from './ClientProfileModal';
import Layout from './Layout';
import './Modal.css';
import './ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isClientProfileModalOpen, setIsClientProfileModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentProject.name || !currentProject.client) {
      alert('Project name and client name are required.');
      return;
    }

    try {
      if (isEditing) {
        await updateProject(currentProject);
        setProjects(projects.map(p => (p.id === currentProject.id ? currentProject : p)));
      } else {
        const createdProject = await createProject(currentProject);
        setProjects([...projects, createdProject]);
      }
      setCurrentProject(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProject(projectToDelete.id);
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  const openModalForEdit = async (project) => {
    setCurrentProject(project);
    try {
      const clientData = await fetchClient(project.clientId);
      project.client = clientData.name;
      setCurrentProject(project);
    } catch (error) {
      console.error(error);
    }
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openModalForAdd = () => {
    setCurrentProject({ name: '', client: '', startDate: '', endDate: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openDetailModal = async (project) => {
    setCurrentProject(project);
    try {
      const clientData = await fetchClient(project.clientId); // Adjust this to fetch client by client ID
      setClient(clientData);
    } catch (error) {
      console.error(error);
    }
    setIsDetailModalOpen(true);
  };

  const openClientProfile = async (clientId) => {
    try {
      const clientData = await fetchClient(clientId);
      setClient(clientData);
    } catch (error) {
      console.error(error);
    }
    setIsClientProfileModalOpen(true);
  };

  return (
    <Layout>
      <div className="project-list-container">
        <div className="project-table-wrapper">
          <h1>Project List</h1>
          <table className="project-table table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Client</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} onClick={() => openDetailModal(project)} style={{ cursor: 'pointer' }}>
                  <td>{project.name}</td>
                  <td>{project.client}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); openModalForEdit(project); }}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); confirmDelete(project); }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button className="btn btn-success" onClick={openModalForAdd}>Add New Project</button>
          </div>
        </div>
        <AddProjectModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          project={currentProject}
          setProject={setCurrentProject}
          isEditing={isEditing}
        />
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
        <ProjectDetailModal
          isOpen={isDetailModalOpen}
          onRequestClose={() => setIsDetailModalOpen(false)}
          project={currentProject}
          client={client}
          openClientProfile={() => {
            setIsDetailModalOpen(false);
            openClientProfile(client.id);
          }}
        />
        <ClientProfileModal
          isOpen={isClientProfileModalOpen}
          onRequestClose={() => setIsClientProfileModalOpen(false)}
          client={client}
        />
      </div>
    </Layout>
  );
};

export default ProjectList;
