import React, { useState } from 'react';
import { api } from '../api';

const VehicleForm = () => {
  // const [make, setMake] = useState('');
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [addedDate, setAddedDate] = useState('');  // Added state for date

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/vehicles/', {
        name,
        registration_number: registrationNumber,
        added_date: addedDate
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
        placeholder="Model"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Registration Number"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
      />
      <input
        type="date"  // Date input field
        placeholder="Date"
        value={addedDate}
        onChange={(e) => setAddedDate(e.target.value)}
      />
      <button type="submit">Add Vehicle</button>
    </form>
  );
};

export default VehicleForm;
