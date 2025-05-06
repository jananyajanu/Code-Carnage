import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // Adjust path as needed

function Navbar({ children }) {
  return (
    <div className="bg-primary text-gray-800 min-h-[80px] relative">
      {/* 🌱 Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 bg-primary shadow-md z-50 h-20">
        <div className="flex justify-between items-center h-full px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="EcoTales Logo"
              className="h-16 w-auto object-contain"
              loading="lazy"
            />
          </Link>

          {/* Message Icon */}
          <Link
            to="/messages"
            className="text-gray-600 hover:text-green-600"
            aria-label="Messages"
          >
            <i className="fas fa-comment-dots fa-2x"></i>
          </Link>
        </div>
      </header>

      {/* 📄 Page Content */}
      <main className="flex-grow px-4 pb-16 ">{children}</main>

      {/* ✅ Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-primary border-t border-gray-300 shadow z-50">
        <div className="flex justify-around items-center h-16">
          {/* Home */}
          <Link
            to="/home"
            className="flex flex-col items-center text-accent hover:text-secondary"
          >
            <i className="fas fa-home text-xl mb-1"></i>
            <span className="text-xs">Home</span>
          </Link>

          {/* Post */}
          <Link
            to="/UploadVideo"
            className="flex flex-col items-center text-gray-500 hover:text-green-600"
          >
            <i className="fas fa-edit text-xl mb-1"></i>
            <span className="text-xs">Post</span>
          </Link>

          {/* Challenges */}
          <Link
            to="/challenges"
            className="flex flex-col items-center text-accent hover:text-secondary"
          >
            <i className="fas fa-tasks text-xl mb-1"></i>
            <span className="text-xs">Challenges</span>
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="flex flex-col items-center text-accent hover:text-secondary"
          >
            <i className="fas fa-user text-xl mb-1"></i>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
