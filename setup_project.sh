#!/bin/bash

# Ensure we are in the project-manager directory
cd project-manager

# Create directories if they do not exist
mkdir -p client/public
mkdir -p client/src/components
mkdir -p models
mkdir -p routes

# Create and add content to .gitignore
cat <<EOL > .gitignore
node_modules
.env
EOL

# Create and add content to package.json
cat <<EOL > package.json
{
  "name": "project-manager",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "server": "nodemon server.js",
    "client": "npm start --prefix client"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.9.10",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "concurrently": "^5.3.0",
    "nodemon": "^2.0.15"
  }
}
EOL

# Create and add content to server.js
cat <<EOL > server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter);

app.listen(port, () => {
    console.log(\`Server is running on port: \${port}\`);
});
EOL

# Create and add content to models/Project.model.js
cat <<EOL > models/Project.model.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
EOL

# Create and add content to routes/projects.js
cat <<EOL > routes/projects.js
const router = require('express').Router();
let Project = require('../models/Project.model');

router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const status = req.body.status;

    const newProject = new Project({name, description, status});

    newProject.save()
        .then(() => res.json('Project added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
EOL

# Create and add content to client/.gitignore
cat <<EOL > client/.gitignore
node_modules
build
EOL

# Create and add content to client/package.json
cat <<EOL > client/package.json
{
  "name": "client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^0.19.2",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.1.2",
    "bootstrap": "^4.5.0",
    "react-scripts": "3.4.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
EOL

# Create and add content to client/public/index.html
cat <<EOL > client/public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Management Tool</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
</head>
<body>
  <div id="root"></div>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</body>
</html>
EOL

# Create an empty favicon.ico file
touch client/public/favicon.ico

# Create and add content to client/public/manifest.json
cat <<EOL > client/public/manifest.json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
EOL

# Create and add content to client/src/App.css
cat <<EOL > client/src/App.css
body {
  background-color: #f8f9fa;
  padding-top: 70px;
}
EOL

# Create and add content to client/src/App.js
cat <<EOL > client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProjectList from './components/ProjectList';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ProjectList} />
        <Route path="/create" component={CreateProject} />
        <Route path="/edit/:id" component={EditProject} />
      </div>
    </Router>
  );
}

export default App;
EOL

# Create and add content to client/src/index.css
cat <<EOL > client/src/index.css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
EOL

# Create and add content to client/src/index.js
cat <<EOL > client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
EOL

# Create and add content to client/src/serviceWorker.js
cat <<EOL > client/src/serviceWorker.js
// This optional code is used to register a service worker.
// register() is not called by default.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/
  )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = \`${process.env.PUBLIC_URL}/service-worker.js\`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'New content is available and will be used when all ' +
                'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.');
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
EOL

# Create and add content to client/src/components/Navbar.js
cat <<EOL > client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
      <Link to="/" className="navbar-brand">Project Management Tool</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Projects</Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">Create Project</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
EOL

# Create and add content to client/src/components/ProjectList.js
cat <<EOL > client/src/components/ProjectList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/projects/')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h3 className="mt-4">Projects</h3>
      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project._id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.status}</td>
              <td>
                <Link to={"/edit/" + project._id} className="btn btn-primary btn-sm">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
EOL

# Create and add content to client/src/components/CreateProject.js
cat <<EOL > client/src/components/CreateProject.js
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
EOL

# Create and add content to client/src/components/EditProject.js
cat <<EOL > client/src/components/EditProject.js
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
EOL

echo "Project structure with content created successfully!"
