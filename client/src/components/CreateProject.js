import React, { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      name,
      description,
      status
    };

    axios.post('http://localhost:5000/projects/add', newProject)
      .then(res => console.log(res.data));

    setName('');
    setDescription('');
    setStatus('');
  };

  return (
    <div className="container">
      <h3 className="mt-4">Create New Project</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input type="text" required className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text" required className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Status: </label>
          <input type="text" required className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="submit" value="Create Project" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
