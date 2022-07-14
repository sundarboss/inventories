import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Menubar = () => {
    return (
        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>Objector</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">All</Nav.Link>
            <Nav.Link as={Link} to="/types">Manage Types</Nav.Link>
          </Nav>
        </Container>
        </Navbar>
    )
}

export default Menubar;