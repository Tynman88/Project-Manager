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
