import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar bg-light">
      <h5 className="sidebar-heading">Sections</h5>
      <ul className="list-unstyled">
        <li><a href="/projects">Projects</a></li>
        <li><a href="/clients">Clients</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
