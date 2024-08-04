import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { fetchClients, createClient, updateClient, deleteClient, fetchClientProjects } from '../services/api';
import AddClientModal from './AddClientModal';
import ClientProfileModal from './ClientProfileModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import './ClientList.css';
import './ClientProfileModal.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [projects, setProjects] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentClient.name || !currentClient.email) {
      alert('Client name and email are required.');
      return;
    }

    try {
      if (isEditing) {
        await updateClient(currentClient);
        setClients(clients.map(c => (c.id === currentClient.id ? currentClient : c)));
      } else {
        const createdClient = await createClient(currentClient);
        setClients([...clients, createdClient]);
      }
      setCurrentClient({ name: '', email: '', phone: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteClient(clientToDelete.id);
      setClients(clients.filter(c => c.id !== clientToDelete.id));
      setIsDeleteModalOpen(false);
      setClientToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  const openModalForEdit = (client) => {
    setCurrentClient(client);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openModalForAdd = () => {
    setCurrentClient({ name: '', email: '', phone: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openProfileModal = async (client) => {
    setCurrentClient(client);
    try {
      const clientProjects = await fetchClientProjects(client.id);
      setProjects(clientProjects);
    } catch (error) {
      console.error(error);
    }
    setIsProfileModalOpen(true);
  };

  return (
    <Layout>
      <div className="client-list-container">
        <div className="client-table-wrapper">
          <h1>Client List</h1>
          <table className="client-table table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td onClick={() => openProfileModal(client)}>{client.name}</td>
                  <td onClick={() => openProfileModal(client)}>{client.email}</td>
                  <td onClick={() => openProfileModal(client)}>{client.phone}</td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => openModalForEdit(client)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(client)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button className="btn btn-success" onClick={openModalForAdd}>Add New Client</button>
          </div>
        </div>
        <AddClientModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialClient={currentClient}
        />
        <ClientProfileModal
          isOpen={isProfileModalOpen}
          onRequestClose={() => setIsProfileModalOpen(false)}
          client={currentClient}
          projects={projects}
        />
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </Layout>
  );
};

export default ClientList;
