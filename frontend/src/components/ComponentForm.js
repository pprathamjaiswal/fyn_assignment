import React, { useState } from 'react';
import { api } from '../api';

const ComponentForm = () => {
  const [name, setName] = useState('');
  const [repairPrice, setRepairPrice] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/components/', {
        name,
        repair_price: repairPrice,
        purchase_price: purchasePrice,
      });
      alert('Component added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding component!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Component</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Repair Price"
        value={repairPrice}
        onChange={(e) => setRepairPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Purchase Price"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
      />
      <button type="submit">Add Component</button>
    </form>
  );
};

export default ComponentForm;
