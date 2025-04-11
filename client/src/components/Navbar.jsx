import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4 text-success" to="/">🌱 Climate Platform</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/upload">Upload</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/feed">Feed</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/leaderboard">Leaderboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/admin">Admin</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
