import React from "react";
import "./NavBar.css";
import { Nav, Navbar, Container, Image } from "react-bootstrap";

export const NavBar = () => {
  return (
      <Navbar collapseOnSelect expand="lg" className="navbar-container">
        <Container>
          <Image src="/standAppLogo.png" className='app-logo'/>
          <Navbar.Brand href="/all_spaces" className="app-title">StandUp</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/all_spaces">Spaces</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Tickets
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};
