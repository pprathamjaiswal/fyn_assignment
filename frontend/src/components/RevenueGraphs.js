import React, { useState, useEffect } from 'react';
import { api } from '../api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Helper function to format data
const processTransactionData = (transactions) => {
  const dailyMap = {};
  const monthlyMap = {};
  const yearlyMap = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.created_at);
    const day = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const month = date.toISOString().slice(0, 7); // Format: YYYY-MM
    const year = date.getFullYear().toString(); // Format: YYYY

    const totalCost = parseFloat(transaction.total_cost);

    // Daily
    if (!dailyMap[day]) {
      dailyMap[day] = 0;
    }
    dailyMap[day] += totalCost;

    // Monthly
    if (!monthlyMap[month]) {
      monthlyMap[month] = 0;
    }
    monthlyMap[month] += totalCost;

    // Yearly
    if (!yearlyMap[year]) {
      yearlyMap[year] = 0;
    }
    yearlyMap[year] += totalCost;
  });

  // Convert maps to arrays
  const dailyData = Object.entries(dailyMap).map(([date, revenue]) => ({ date, revenue }));
  const monthlyData = Object.entries(monthlyMap).map(([month, revenue]) => ({ month, revenue }));
  const yearlyData = Object.entries(yearlyMap).map(([year, revenue]) => ({ year, revenue }));

  return { dailyData, monthlyData, yearlyData };
};

const RevenueGraphs = () => {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await api.get('/transactions/');
        const transactions = response.data;

        // Process data
        const { dailyData, monthlyData, yearlyData } = processTransactionData(transactions);

        // Update state
        setDailyData(dailyData);
        setMonthlyData(monthlyData);
        setYearlyData(yearlyData);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading revenue data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="graph-container">
      <h2>Revenue Graphs</h2>
      <h3>Daily Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <h3>Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <h3>Yearly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueGraphs;
