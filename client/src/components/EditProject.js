import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProject = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/projects/' + props.match.params.id)
      .then(response => {
        setName(response.data.name);
        setDescription(response.data.description);
        setStatus(response.data.status);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.match.params.id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedProject = {
      name,
      description,
      status
    };

    axios.post('http://localhost:5000/projects/update/' + props.match.params.id, updatedProject)
      .then(res => console.log(res.data));

    props.history.push('/');
  };

  return (
    <div className="container">
      <h3 className="mt-4">Edit Project</h3>
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
          <input type="submit" value="Update Project" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditProject;
