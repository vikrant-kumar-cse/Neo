import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
  padding: '10px 15px',
  borderRadius: '8px',
  marginBottom: '8px',
  display: 'block',
  fontWeight: '500',
};

const activeStyle = {
  backgroundColor: '#2d3748',
  color: '#00d1b2',
};

const AdminSidebar = () => {
  return (
    <div style={{ width: '100%' }}>
      <h4 className="text-white mb-4">🛠️ Admin Panel</h4>

      <Nav className="flex-column">
        <NavLink to="/admin-dashboard" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/admin-dashboard/User-Detaied" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
          👤 User Details
        </NavLink>
        <NavLink to="/admin-dashboard/analytics" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        📈 Analytics
        </NavLink>
        <NavLink to="/admin-dashboard/admin-settings" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
          ⚙️ Settings
        </NavLink>
        <NavLink to="/admin-dashboard/store-manager" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        🏪 Manage 3D Stores
        </NavLink>
        <NavLink to="/admin-dashboard/product-manager" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        🏪 Manage 3D Product
        </NavLink>

        <NavLink to="/admin-dashboard/admin-create" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        Create Sub Admin
        </NavLink>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
