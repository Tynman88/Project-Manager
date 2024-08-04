import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProjectList from './components/ProjectList';
import ClientList from './components/ClientList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/clients" element={<ClientList />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
