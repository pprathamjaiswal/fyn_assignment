import React, { useState, useEffect } from 'react';
import { api } from '../api';

const TransactionForm = () => {
  const [vehicles, setVehicles] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleResponse = await api.get('/vehicles/');
        const issueResponse = await api.get('/issues/');
        setVehicles(vehicleResponse.data);
        setIssues(issueResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCalculate = async () => {
    if (!selectedVehicle || selectedIssues.length === 0) {
      alert('Please select a vehicle and at least one issue.');
      return;
    }

    try {
      const response = await api.post('/transactions/', {
        vehicle_id: selectedVehicle,
        issues: selectedIssues,
      });
      setTotalCost(response.data.total_cost);
    } catch (error) {
      console.error('Error calculating total cost:', error);
      alert('Failed to calculate total cost. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (totalCost === 0) {
      alert('Please calculate the total cost before submitting.');
      return;
    }

    alert(`Transaction completed! Total Cost: ₹${totalCost}`);
    // Additional submission logic can be added here.
  };

  return (
    <div>
      <h2>Transaction Form</h2>

      {/* Select Vehicle */}
      <div>
        <label>Select Vehicle:</label>
        <select
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
        >
          <option value="">--Select Vehicle--</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.vehicle_number} - {vehicle.owner_name}
            </option>
          ))}
        </select>
      </div>

      {/* Select Issues */}
      <div>
        <label>Select Issues:</label>
        {issues.map((issue) => (
          <div key={issue.id}>
            <input
              type="checkbox"
              value={issue.id}
              onChange={(e) => {
                const id = Number(e.target.value);
                if (e.target.checked) {
                  setSelectedIssues((prev) => [...prev, id]);
                } else {
                  setSelectedIssues((prev) => prev.filter((issueId) => issueId !== id));
                }
              }}
            />
            <label>
              {issue.component.name} - {issue.issue_type} - ₹{issue.component.repair_price || issue.component.purchase_price}
            </label>
          </div>
        ))}
      </div>

      {/* Total Cost */}
      <div>
        <button onClick={handleCalculate}>Calculate Total Cost</button>
        {totalCost > 0 && <p>Total Cost: ₹{totalCost}</p>}
      </div>

      {/* Submit Transaction */}
      <div>
        <button onClick={handleSubmit}>Submit Transaction</button>
      </div>
    </div>
  );
};

export default TransactionForm;
