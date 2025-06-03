import React, { useState, useEffect, useCallback } from 'react';
import { Button, Form, Modal, Card, Row, Col, Container, InputGroup, FormControl, Dropdown, DropdownButton, Badge, Spinner } from 'react-bootstrap';
import { Search, Grid, List, SortAlphaDown, SortAlphaUp } from 'react-bootstrap-icons';
import GLBViewer from './GLBViewer';

// Constants
const API_BASE_URL = 'http://localhost:8080';
const INITIAL_FORM_STATE = {
  name: '',
  description: '',
  brand: '',
  category: '',
  price: '',
  discount: '',
  stock: '',
  images: [],
  color: '',
  size: '',
  weight: '',
  store: '',
  location: '',
  status: 'active',
};

const ProductManager = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/product/api/product`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize data
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply filters
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      );
    }
    
    if (activeCategory !== 'all') {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    
    setFilteredProducts(result);
  }, [products, searchTerm, sortOrder, activeCategory]);

  // Extract categories from products
  useEffect(() => {
    if (products.length > 0) {
      const categorySet = new Set(['all']);
      products.forEach(product => {
        if (product.category) categorySet.add(product.category);
      });
      setCategories(Array.from(categorySet));
    }
  }, [products]);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (e) => {
    setFormData(prev => ({ ...prev, color: e.target.value }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
  };

  // File upload handler
  const handleGlbUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file has one of the allowed extensions
    const allowedExtensions = ['.glb', '.fbx', '.obj'];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension) {
      alert('Only .glb, .fbx, and .obj files are allowed!');
      e.target.value = '';
      return;
    }

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch(`${API_BASE_URL}/upload/api/upload`, {
        method: 'POST',
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        const fileUrl = data.fileUrl.startsWith('http')
          ? data.fileUrl
          : `${API_BASE_URL}${data.fileUrl.startsWith('/') ? data.fileUrl : `/${data.fileUrl}`}`;
          
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, fileUrl],
        }));
        alert('3D model uploaded successfully');
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    }
  };


  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const isEditing = !!editingProduct;
    const url = isEditing
      ? `${API_BASE_URL}/product/api/product/${editingProduct._id}`
      : `${API_BASE_URL}/product/api/product`;
    
    // Normalize image URLs
    const normalizedFormData = {
      ...formData,
      images: (formData.images || [])
        .filter(img => typeof img === 'string')
        .map(img => img.startsWith('http') ? img : `${API_BASE_URL}${img.startsWith('/') ? img : `/${img}`}`)
    };

    try {
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(normalizedFormData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(isEditing ? 'Product updated successfully' : 'Product created successfully');
        resetForm();
        setShowModal(false);
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Edit product handler
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      images: (product.images || [])
        .filter(img => typeof img === 'string')
        .map(img => img.startsWith('http') ? img : `${API_BASE_URL}${img.startsWith('/') ? img : `/${img}`}`)
    });
    setShowModal(true);
  };

  // Delete product handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/product/api/product/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        alert('Product deleted successfully');
        fetchProducts();
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Helper functions
  const toggleSortOrder = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  
  const getDiscountedPrice = (price, discount) => {
    if (!price) return 0;
    if (!discount) return price;
    return (price - (price * discount / 100)).toFixed(2);
  };

  const openModal = () => {
    resetForm();
    setEditingProduct(null);
    setShowModal(true);
  };

  // Render product card (for grid view)
  const renderProductCard = (product) => (
    <Col key={product._id} lg={4} md={6} sm={12} className="mb-4">
      <Card className="shadow-sm h-100">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <Badge bg={product.status === 'active' ? 'success' : 'secondary'}>
            {product.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
          {product.stock <= 5 && (
            <Badge bg="warning" text="dark">Low Stock: {product.stock}</Badge>
          )}
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
          <Card.Text>{product.description}</Card.Text>

          <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <strong className="me-2">Price:</strong>
              {product.discount ? (
                <div>
                  <span className="text-decoration-line-through text-muted me-2">₹{product.price}</span>
                  <span className="text-danger fw-bold">₹{getDiscountedPrice(product.price, product.discount)}</span>
                  <Badge bg="danger" className="ms-2">{product.discount}% OFF</Badge>
                </div>
              ) : (
                <span>₹{product.price}</span>
              )}
            </div>
            <div className="d-flex">
              {product.category && <Badge bg="info" className="me-2">{product.category}</Badge>}
              {product.color && (
                <div className="d-flex align-items-center me-2">
                  <div
                    className="rounded-circle me-1"
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: product.color,
                      border: '1px solid #ddd'
                    }}
                  ></div>
                  <small>{product.color}</small>
                </div>
              )}
              {product.size && <small className="me-2">Size: {product.size}</small>}
            </div>
          </div>

          <div className="mb-3 mt-auto flex-grow-1">
            {product.images && product.images[0] && typeof product.images[0] === 'string' ? (
              <>
                <h6 className="mb-2">3D Model Preview</h6>
                <div className="border rounded overflow-hidden" style={{ minHeight: '240px' }}>
                  <GLBViewer fileUrl={product.images[0]} />
                </div>
              </>
            ) : (
              <div className="text-center text-muted p-4 border rounded bg-light">
                No 3D model available
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between mt-3">
            <span className="text-muted">Stock: {product.stock} units</span>
            <span className="text-muted">
              {product.store && `${product.store} · `}
              {product.location}
            </span>
          </div>

          <div className="mt-3 pt-2 d-flex justify-content-between border-top">
            <Button variant="warning" onClick={() => handleEdit(product)}>Edit</Button>
            <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  // Render product row (for list view)
  const renderProductRow = (product) => (
    <Card key={product._id} className="mb-3 shadow-sm">
      <Card.Body>
        <Row>
          <Col md={3}>
            {product.images && product.images[0] && typeof product.images[0] === 'string' ? (
              <div className="border rounded overflow-hidden" style={{ height: '150px' }}>
                <GLBViewer fileUrl={product.images[0]} />
              </div>
            ) : (
              <div className="text-center text-muted p-4 border rounded bg-light" style={{ height: '150px' }}>
                No 3D model available
              </div>
            )}
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-center mb-2">
              <h5 className="mb-0 me-2">{product.name}</h5>
              <Badge bg={product.status === 'active' ? 'success' : 'secondary'} className="me-2">
                {product.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
              {product.stock <= 5 && (
                <Badge bg="warning" text="dark">Low Stock: {product.stock}</Badge>
              )}
            </div>
            <p className="text-muted mb-1">{product.brand}</p>
            <p className="mb-2">{product.description}</p>
            <div className="d-flex flex-wrap mb-2">
              {product.category && <Badge bg="info" className="me-2 mb-1">{product.category}</Badge>}
              {product.color && (
                <div className="d-flex align-items-center me-2 mb-1">
                  <div
                    className="rounded-circle me-1"
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: product.color,
                      border: '1px solid #ddd'
                    }}
                  ></div>
                  <small>{product.color}</small>
                </div>
              )}
              {product.size && <small className="me-2 mb-1">Size: {product.size}</small>}
              {product.weight && <small className="me-2 mb-1">Weight: {product.weight}</small>}
            </div>
            <div className="text-muted small">
              <span>Stock: {product.stock} units</span>
              {product.store && <span className="ms-3">Store: {product.store}</span>}
              {product.location && <span className="ms-3">Location: {product.location}</span>}
            </div>
          </Col>
          <Col md={3} className="d-flex flex-column justify-content-between">
            <div>
              <div className="text-end mb-2">
                {product.discount ? (
                  <div>
                    <div className="text-decoration-line-through text-muted">₹{product.price}</div>
                    <div className="text-danger fw-bold fs-5">₹{getDiscountedPrice(product.price, product.discount)}</div>
                    <Badge bg="danger" className="ms-2">{product.discount}% OFF</Badge>
                  </div>
                ) : (
                  <div className="fw-bold fs-5">₹{product.price}</div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="warning" size="sm" onClick={() => handleEdit(product)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>Delete</Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  // Render product form
  const renderProductForm = () => (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
            <Form.Control name="name" type="text" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control name="description" as="textarea" rows={3} value={formData.description} onChange={handleChange} />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control name="brand" type="text" value={formData.brand} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control name="category" type="text" value={formData.category} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Price <span className="text-danger">*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Text>₹</InputGroup.Text>
                  <Form.Control name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange} required />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Discount (%)</Form.Label>
                <InputGroup>
                  <Form.Control name="discount" type="number" min="0" max="100" value={formData.discount} onChange={handleChange} />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Stock <span className="text-danger">*</span></Form.Label>
                <Form.Control name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <div className="d-flex">
                  <Form.Control name="color" type="text" value={formData.color} onChange={handleChange} className="flex-grow-1" />
                  <Form.Control type="color" value={formData.color} onChange={handleColorChange} className="ms-2" style={{ width: "40px" }} />
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Size</Form.Label>
                <Form.Control name="size" type="text" value={formData.size} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Control name="weight" type="text" value={formData.weight} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Store</Form.Label>
            <Form.Control name="store" type="text" value={formData.store} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control name="location" type="text" value={formData.location} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>


      <Form.Group className="mb-3 mt-3">
      <Form.Label>Upload 3D Model File (.glb, .fbx, .obj)</Form.Label>
        <Form.Control type="file" accept=".glb,.fbx,.obj,.mlt" onChange={handleGlbUpload} />
        <Form.Text className="text-muted">Supported formats: .glb, .fbx, .obj. Max file size: 20MB</Form.Text>
      </Form.Group>

      {formData.images && formData.images.length > 0 && (
        <div className="mb-3 border rounded p-3 bg-light">
          <h5>Current 3D Model</h5>
          <div style={{ height: '250px', overflow: 'hidden' }}>
            <GLBViewer fileUrl={formData.images[0]} />
          </div>
        </div>
      )}



      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
        <Button type="submit" variant="primary">
          {editingProduct ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </Form>
  );


  

  // Render main stats cards
  const renderStatsCards = () => (
    <Row className="mb-4">
      <Col md={3} sm={6} className="mb-3 mb-md-0">
        <Card className="text-center border-primary">
          <Card.Body>
            <h3>{products.length}</h3>
            <Card.Text>Total Products</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-3 mb-md-0">
        <Card className="text-center border-success">
          <Card.Body>
            <h3>{products.filter(p => p.status === 'active').length}</h3>
            <Card.Text>Active Products</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-3 mb-md-0">
        <Card className="text-center border-warning">
          <Card.Body>
            <h3>{products.filter(p => p.stock <= 5 && p.stock > 0).length}</h3>
            <Card.Text>Low Stock</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6}>
        <Card className="text-center border-danger">
          <Card.Body>
            <h3>{products.filter(p => p.stock === 0).length}</h3>
            <Card.Text>Out of Stock</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  // Main render
  return (
    <Container className="mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Manager</h2>
        <Button variant="primary" onClick={openModal}>Add Product</Button>
      </div>

      {/* Search and Filter Controls */}
      <Row className="mb-4">
        <Col md={5} className="mb-3 mb-md-0">
          <InputGroup>
            <InputGroup.Text><Search /></InputGroup.Text>
            <FormControl
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>✕</Button>
            )}
          </InputGroup>
        </Col>
        <Col md={4} className="mb-3 mb-md-0">
          <DropdownButton id="category-dropdown" title={`Category: ${activeCategory}`} variant="outline-secondary">
            {categories.map(category => (
              <Dropdown.Item 
                key={category} 
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button variant="outline-secondary" className="me-2" onClick={toggleSortOrder}>
            {sortOrder === 'asc' ? <SortAlphaDown /> : <SortAlphaUp />}
          </Button>
          <Button
            variant={`outline-${viewMode === 'grid' ? 'primary' : 'secondary'}`}
            className="me-2"
            onClick={() => setViewMode('grid')}
          >
            <Grid />
          </Button>
          <Button
            variant={`outline-${viewMode === 'list' ? 'primary' : 'secondary'}`}
            onClick={() => setViewMode('list')}
          >
            <List />
          </Button>
        </Col>
      </Row>

      {/* Stats Cards */}
      {renderStatsCards()}

      {/* Product Content */}
      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center my-5 py-5 border rounded bg-light">
          <h5>No products found</h5>
          <p className="text-muted">Try changing your search criteria or add a new product</p>
          <Button variant="primary" onClick={openModal}>Add Product</Button>
        </div>
      ) : viewMode === 'grid' ? (
        <Row className="mt-4">
          {filteredProducts.map(renderProductCard)}
        </Row>
      ) : (
        <div className="mt-4">
          {filteredProducts.map(renderProductRow)}
        </div>
      )}

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderProductForm()}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductManager;