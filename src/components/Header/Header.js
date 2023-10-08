import React from "react"
import {LinkContainer} from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.scss'

const Header = () => {
    return (
        <Navbar variant='dark' bg="dark" expand="lg" className="">
        <Container className="container-nav">
          <LinkContainer to="/">
            <Navbar.Brand>Guardians Central</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="vanguard">
                <Nav.Link>Vanguard</Nav.Link>
              </LinkContainer>
              <LinkContainer to="crucible">
                <Nav.Link>Crucible</Nav.Link>
              </LinkContainer>
              <LinkContainer to="gambit">
                <Nav.Link>Gambit</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      );
    
};

export default Header