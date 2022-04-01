import React from "react";
import "./NavBar.css";
import { Nav, Navbar, Container, Image } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate('/login')

  const handleLogout = async () => {
    await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/users/logout",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    navigate('/login')

  }

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
                My Tickets
              </Nav.Link>
              <Nav.Link href="/videoRoom">Rooms</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div onClick={handleLogout}>
          <BoxArrowRight className="fs-4"/> Logout
          </div>          
        </Container>
      </Navbar>
  );
};
