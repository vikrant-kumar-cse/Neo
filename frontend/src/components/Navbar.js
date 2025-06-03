import React, { useState } from "react";
import {
  Navbar as ReactstrapNavbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import { handleError, handleSuccess } from '../utils';

const styles = {
  navbar: {
    height: '100vh',
    width: '250px',
    backgroundColor: '#1a202c',
    position: 'fixed',
    top: '0',
    left: '0',
    overflowY: 'auto',
    padding: '20px',
  },
  brand: {
    color: '#00d1b2',
    fontSize: '1.5rem',
    marginBottom: '20px',
    display: 'block',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  navLink: {
    color: '#cbd5e0',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    display: 'block',
    marginBottom: '8px',
  },
  activeLink: {
    backgroundColor: '#2d3748',
    color: '#00d1b2',
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate(); // <-- Initialize navigate here

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/brandlogin');  // <-- Navigate to brand login
    }, 1000);
  };

  return (
    <div style={styles.navbar}>
      <a href="/" style={styles.brand}>
        NeoMarche@IT
      </a>

      <Nav vertical>
        <NavItem>
          <NavLink href="/components/" style={styles.navLink}>
            📦 Components
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/reactstrap/reactstrap" style={styles.navLink}>
            💻 GitHub
          </NavLink>
        </NavItem>

        {/* Options Dropdown */}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret style={styles.navLink}>
            ⚙️ Options
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        {/* Login Dropdown */}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret style={styles.navLink}>
            🔐 Login
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem href="/login">User Login</DropdownItem>
            <DropdownItem href="/brandsignup">BrandMan_Signup</DropdownItem>
            <DropdownItem href="/brandlogin">BrandMan_Login</DropdownItem>
            <DropdownItem href="/admin-login">Admin Login</DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="/login/more">More...</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </Nav>
    </div>
  );
};

export default Navbar;
