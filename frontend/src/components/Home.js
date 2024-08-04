import React from 'react';
import Layout from './Layout';

const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        <h1>Welcome to Project Manager</h1>
        <p>Here you can find a quick overview of your projects and recent activities.</p>

        <div className="dashboard-widgets">
          <div className="widget">
            <h3>Total Projects</h3>
            <p>10</p> {/* Replace with dynamic data */}
          </div>
          <div className="widget">
            <h3>Pending Tasks</h3>
            <p>5</p> {/* Replace with dynamic data */}
          </div>
          <div className="widget">
            <h3>Recent Activities</h3>
            <ul>
              <li>Project A updated</li>
              <li>Task X completed</li>
              <li>Client Y contacted</li>
              {/* Replace with dynamic data */}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
