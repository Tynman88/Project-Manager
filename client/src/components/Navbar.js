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
