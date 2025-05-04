import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <img src={logo} alt="Climate Platform Logo" className="w-24 mb-6" />
      <h1 className="text-4xl font-semibold mb-3">Welcome to Climate Platform</h1>
      <p className="text-lg mb-6">Share your 60-second sustainability stories and make an impact!</p>
      <Link to="/select-role" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
        Get Started
      </Link>
    </div>
  );
}

export default LandingPage;
