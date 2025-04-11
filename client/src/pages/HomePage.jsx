import React from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import logo from "../assets/logo.jpg"; // Make sure this path is correct
import "./HomePage.css"; // Update to correct relative path

function HomePage() {
  return (
    <div className="home-container position-relative text-white">
      {/* Dim Logo Background */}
      <img src={logo} alt="Logo" className="background-logo" />

      {/* Top Dropdown */}
      <div className="position-absolute top-0 start-0 p-3 z-3">
        <Dropdown>
          <Dropdown.Toggle variant="light" size="sm">
            Profile
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/profile">My Info</Dropdown.Item>
            <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Weekly Challenge Section */}
      <Container className="mt-5 pt-5 text-center">
        <h2 className="fw-bold mb-3">🌱 Weekly Challenge</h2>
        <p className="lead">
          This week: Reduce plastic usage! Share your story 🌍
        </p>
      </Container>

      {/* About Section */}
      <Container className="about-section mt-5 p-4">
        <h4>About Us</h4>
        <p>
          Our platform empowers students and schools to share 60-second
          sustainability stories — from recycling tips to eco initiatives. Join
          the movement to make climate literacy fun and impactful!
        </p>
      </Container>

      {/* Bottom NavBar */}
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Nav className="w-100 d-flex justify-content-around">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Post</Nav.Link>
          <Nav.Link href="#">Challenges</Nav.Link>
          <Nav.Link href="#">Leaderboard</Nav.Link>
          <Nav.Link href="#">Profile</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default HomePage;
