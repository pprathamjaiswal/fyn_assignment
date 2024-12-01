import React, { useState } from 'react';
import { api } from '../api';

const VehicleForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/vehicles/', {
        make,
        model,
        registration_number: registrationNumber,
      });
      alert('Vehicle added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding vehicle!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Vehicle</h2>
      <input
        type="text"
        placeholder="Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Registration Number"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
      />
      <button type="submit">Add Vehicle</button>
    </form>
  );
};

export default VehicleForm;
