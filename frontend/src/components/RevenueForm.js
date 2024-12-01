import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const RevenueGraphs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/transactions/');
        const formattedData = response.data.map((transaction) => ({
          date: transaction.created_at.split('T')[0],
          totalCost: parseFloat(transaction.total_cost),
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Revenue Graph</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalCost" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};


