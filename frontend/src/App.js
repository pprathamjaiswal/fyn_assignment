import React from 'react';
import './styles.css'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ComponentForm from './components/ComponentForm';
import VehicleForm from './components/VehicleForm';
import IssueForm from './components/IssueForm';
import RevenueGraphs from './components/RevenueGraphs';
import Header from './components/Navbar';

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <h1>Delivery Management System</h1>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Delivery Management System</h2>} />
          <Route path="/components" element={<ComponentForm />} />
          <Route path="/vehicles" element={<VehicleForm />} />
          <Route path="/issues" element={<IssueForm />} />
          <Route path="/revenue" element={<RevenueGraphs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
