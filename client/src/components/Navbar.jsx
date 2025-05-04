import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-3xl font-bold text-green-500" to="/">
          🌱 Climate Platform
        </Link>
        <button className="lg:hidden text-white" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="lg:flex lg:items-center lg:w-auto w-full hidden lg:block" id="nav">
          <ul className="flex space-x-4">
            <li>
              <Link className="text-white hover:text-green-500 px-3" to="/">Home</Link>
            </li>
            <li>
              <Link className="text-white hover:text-green-500 px-3" to="/upload">Upload</Link>
            </li>
            <li>
              <Link className="text-white hover:text-green-500 px-3" to="/feed">Feed</Link>
            </li>
            <li>
              <Link className="text-white hover:text-green-500 px-3" to="/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link className="text-white hover:text-green-500 px-3" to="/admin">Admin</Link>
            </li>
            <li>
              <Link className="text-white hover:text-green-500 px-3" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
