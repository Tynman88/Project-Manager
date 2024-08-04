const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  const data = await response.json();
  return data;
};

export const createProject = async (project) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  });
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  const data = await response.json();
  return data;
};

export const updateProject = async (project) => {
  const response = await fetch(`${API_URL}/projects/${project.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  });
  if (!response.ok) {
    throw new Error('Failed to update project');
  }
  const data = await response.json();
  return data;
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
};

export const fetchClients = async () => {
  const response = await fetch(`${API_URL}/clients`);
  if (!response.ok) {
    throw new Error('Failed to fetch clients');
  }
  const data = await response.json();
  return data;
};

export const createClient = async (client) => {
  const response = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(client)
  });
  if (!response.ok) {
    throw new Error('Failed to create client');
  }
  const data = await response.json();
  return data;
};

export const updateClient = async (client) => {
  const response = await fetch(`${API_URL}/clients/${client.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(client)
  });
  if (!response.ok) {
    throw new Error('Failed to update client');
  }
  const data = await response.json();
  return data;
};

export const deleteClient = async (id) => {
  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete client');
  }
};

export const fetchClientProjects = async (clientId) => {
  const response = await fetch(`${API_URL}/clients/${clientId}/projects`);
  if (!response.ok) {
    throw new Error('Failed to fetch client projects');
  }
  const data = await response.json();
  return data;
};

export const fetchClient = async (clientId) => {
  const response = await fetch(`${API_URL}/clients/${clientId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch client');
  }
  const data = await response.json();
  return data;
};

export const fetchChangeLogs = async (entityId, entityType) => {
  const response = await fetch(`${API_URL}/changeLogs?entityId=${entityId}&entityType=${entityType}`);
  if (!response.ok) {
    throw new Error('Failed to fetch change logs');
  }
  const data = await response.json();
  return data;
};
