import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminSidebar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Container fluid className="p-0">
      <Row noGutters="true">
        {/* Sidebar */}
        <Col md={3} className="bg-dark text-white d-flex flex-column align-items-start" style={{ minHeight: '100vh', padding: '20px' }}>
          <AdminSidebar />
        </Col>

        {/* Main Content */}
        <Col md={9} className="bg-light" style={{ minHeight: '100vh', padding: '30px' }}>
          <div className="bg-white shadow rounded p-4">
            <h2 className="mb-3 text-primary">🎯 Admin Dashboard</h2>
            <hr />
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
