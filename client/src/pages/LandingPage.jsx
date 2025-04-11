import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"; // Adjust path based on your structure
import logo from "../assets/logo.jpg"; // Replace with actual path to your logo

function LandingPage() {
  return (
    <div className="landing-container">
      <img src={logo} alt="Climate Platform Logo" className="landing-logo" />
      <h1>Welcome to Climate Platform</h1>
      <p>Share your 60-second sustainability stories and make an impact!</p>
      <Link to="/select-role" className="landing-btn">
        Get Started
      </Link>
    </div>
  );
}

export default LandingPage;
