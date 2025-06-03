import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const AdminAnalytics = () => {
  const storeVisits = [
    { name: 'Mon', visits: 120 },
    { name: 'Tue', visits: 210 },
    { name: 'Wed', visits: 300 },
    { name: 'Thu', visits: 250 },
    { name: 'Fri', visits: 350 },
    { name: 'Sat', visits: 500 },
    { name: 'Sun', visits: 420 },
  ];

  const totalStats = {
    totalStores: 124,
    activeUsers: 58,
    totalVisits: 1892,
  };

  const containerStyle = {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '30px',
    fontWeight: 'bold',
  };

  const statsCardsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '30px',
  };

  const cardStyle = (bgColor) => ({
    flex: 1,
    minWidth: '200px',
    padding: '20px',
    color: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: bgColor,
  });

  const chartsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  };

  const chartBoxStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>📊 Admin Analytics Dashboard</h2>

      <div style={statsCardsStyle}>
        <div style={cardStyle('#3b82f6')}>
          <h4>🏪 Total Stores</h4>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalStats.totalStores}</p>
        </div>
        <div style={cardStyle('#10b981')}>
          <h4>👥 Active Users</h4>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalStats.activeUsers}</p>
        </div>
        <div style={cardStyle('#8b5cf6')}>
          <h4>📈 Total Visits</h4>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalStats.totalVisits}</p>
        </div>
      </div>

      <div style={chartsContainerStyle}>
        <div style={chartBoxStyle}>
          <h4>📊 Store Visits (Last 7 Days)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={storeVisits}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={chartBoxStyle}>
          <h4>📉 Visits Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={storeVisits}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visits" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
