import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
