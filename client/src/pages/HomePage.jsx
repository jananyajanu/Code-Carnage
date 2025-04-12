import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.jpg"; // Make sure this path is correct
import "./HomePage.css"; // Update to correct relative path
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-container position-relative text-white">
      {/* Dim Logo Background */}
      <img src={logo} alt="Logo" className="background-logo" />

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
          <Link to="/Homepage">Home</Link>
          <Link to="/UploadVideo">Post</Link>
          <Link to="/select-role">Challenges</Link>
          <Link to="/ProfilePanel">ProfilePanel</Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default HomePage;
