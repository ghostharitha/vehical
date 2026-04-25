import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddVehicle from './components/AddVehicle';
import VehicleList from './components/VehicleList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleVehicleAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">🚗 Vehicle Management System</h1>
            <ul className="nav-menu">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/add">Add Vehicle</a>
              </li>
              <li>
                <a href="/vehicles">View Vehicles</a>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddVehicle onVehicleAdded={handleVehicleAdded} />} />
            <Route path="/vehicles" element={<VehicleList key={refreshKey} />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2026 Vehicle Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h2>Welcome to Vehicle Management System</h2>
        <p>Manage your vehicle inventory with ease</p>
        <div className="hero-buttons">
          <a href="/add" className="btn-primary">Add New Vehicle</a>
          <a href="/vehicles" className="btn-secondary">View All Vehicles</a>
        </div>
      </div>
    </div>
  );
};

export default App;
