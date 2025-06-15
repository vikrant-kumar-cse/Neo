import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Card, Row, Col } from 'react-bootstrap';

const StoreManager = () => {
  const [stores, setStores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ownerName: '',
    ownerEmail: '',
    logoUrl: '',
    address: '',
    contactPhone: '',
    status: 'active',
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/stores/api/store', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setStores(data);
    } catch (err) {
      console.error('Error fetching stores:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingStore
      ? `http://localhost:8080/stores/api/store/${editingStore._id}`
      : 'http://localhost:8080/stores/api/store';

    const method = editingStore ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(editingStore ? 'Store updated' : 'Store created');
        setShowModal(false);
        setEditingStore(null);
        resetForm();
        fetchStores();
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (store) => {
    setEditingStore(store);
    setFormData(store);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this store?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/stores/api/store/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert('Store deleted');
        fetchStores();
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    }
  };

  const handleOpen3DRoom = (storeId) => {
    // You can modify this to redirect to a dynamic room URL
    window.open(`/3d-room/${storeId}`, '_blank');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      ownerName: '',
      ownerEmail: '',
      logoUrl: '',
      address: '',
      contactPhone: '',
      status: 'active',
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🛍️ Store Manager</h2>

      <div className="text-center mb-4">
        <Button onClick={() => setShowModal(true)}>+ Create Store</Button>
      </div>

      {/* Store Cards */}
      <Row className="g-4">
        {stores.map((store, index) => (
          <Col key={store._id || index} xs={12} sm={6}>
            <Card className="h-100 shadow-sm">
              {store.logoUrl && (
                <Card.Img
                  variant="top"
                  src={store.logoUrl}
                  alt="Store Logo"
                  style={{ maxHeight: '200px', objectFit: 'contain', padding: '1rem' }}
                />
              )}
              <Card.Body>
                <Card.Title className="text-center">{store.name}</Card.Title>
                <Card.Text style={{ fontSize: '0.9rem' }}>
                  <strong>Description:</strong> {store.description}<br />
                  <strong>Owner:</strong> {store.ownerName}<br />
                  <strong>Email:</strong> {store.ownerEmail}<br />
                  <strong>Phone:</strong> {store.contactPhone}<br />
                  <strong>Address:</strong> {store.address}<br />
                  <strong>Status:</strong> {store.status}
                </Card.Text>
                <div className="d-flex justify-content-around mt-3">
                  <Button variant="warning" size="sm" onClick={() => handleEdit(store)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(store._id)}>Delete</Button>
                </div>
                <div className="text-center mt-2">
                  <Button variant="primary" size="sm" onClick={() => handleOpen3DRoom(store._id)}>
                    🛒 Open 3D Room
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingStore(null);
          resetForm();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{editingStore ? 'Update Store' : 'Create Store'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {[
              { label: 'Store Name', name: 'name' },
              { label: 'Description', name: 'description' },
              { label: 'Owner Name', name: 'ownerName' },
              { label: 'Owner Email', name: 'ownerEmail', type: 'email' },
              { label: 'Logo URL', name: 'logoUrl' },
              { label: 'Address', name: 'address' },
              { label: 'Contact Phone', name: 'contactPhone' },
            ].map(({ label, name, type = 'text' }) => (
              <Form.Group className="mb-3" key={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required={name !== 'logoUrl'}
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setShowModal(false);
              setEditingStore(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingStore ? 'Update Store' : 'Create Store'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default StoreManager;
