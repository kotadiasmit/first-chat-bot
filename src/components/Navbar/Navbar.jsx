import "./Navbar.css";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const NavbarComp = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <h4 className="nav-brand">Chat Bot</h4>

        <Nav>
          <NavLink to="/" className="nav-link">
            Change User
          </NavLink>
          <NavLink to="/userChats" className="nav-link">
            User Chats
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
