import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const AdminSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    alert('✅ Settings saved successfully!');
  };

  return (
    <Card className="shadow-sm p-4">
      <h3 className="mb-4 text-primary">⚙️ Settings</h3>

      <Form onSubmit={handleSave}>
        <Row>
          {/* Profile Info */}
          <Col md={6}>
            <h5 className="mb-3">👤 Profile Information</h5>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
          </Col>

          {/* Password Section */}
          <Col md={6}>
            <h5 className="mb-3">🔐 Change Password</h5>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" placeholder="Current password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="New password" />
            </Form.Group>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* Toggles */}
        <Row>
          <Col md={6}>
            <Form.Check
              type="switch"
              id="darkModeSwitch"
              label="🌙 Enable Dark Mode"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="mb-3"
            />
            <Form.Check
              type="switch"
              id="notificationSwitch"
              label="🔔 Receive Notifications"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </Col>
        </Row>

        <div className="mt-4">
          <Button variant="primary" type="submit">
            💾 Save Changes
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default AdminSettings;
