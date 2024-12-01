import React, { useState, useEffect } from 'react';
import { api } from '../api';

const IssueForm = () => {
  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [issueType, setIssueType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const vehicleResponse = await api.get('/vehicles/');
      setVehicles(vehicleResponse.data);
      const componentResponse = await api.get('/components/');
      setComponents(componentResponse.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/issues/', {
        vehicle: selectedVehicle,
        component: selectedComponent,
        issue_type: issueType,
      });
      alert('Issue logged successfully!');
    } catch (error) {
      console.error(error);
      alert('Error logging issue!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log Issue</h2>
      <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
        <option value="">Select Vehicle</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.make} {vehicle.model} ({vehicle.registration_number})
          </option>
        ))}
      </select>
      <select value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)}>
        <option value="">Select Component</option>
        {components.map((component) => (
          <option key={component.id} value={component.id}>
            {component.name}
          </option>
        ))}
      </select>
      <select value={issueType} onChange={(e) => setIssueType(e.target.value)}>
        <option value="">Select Issue Type</option>
        <option value="REPAIR">Repair</option>
        <option value="REPLACE">Replace</option>
      </select>
      <button type="submit">Log Issue</button>
    </form>
  );
};

export default IssueForm;
