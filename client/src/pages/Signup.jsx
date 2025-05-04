import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../api/axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const location = useLocation();
  const role =
    new URLSearchParams(location.search).get("role") ||
    localStorage.getItem("selectedRole") ||
    "user";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role,
      });

      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
          Signup as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
