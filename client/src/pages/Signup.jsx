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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("/users/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: role,
      });

      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4 rounded-4">
        <h3 className="text-center mb-4 text-primary">
          Signup as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control border-primary shadow-sm"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email or Phone</label>
            <input
              type="email"
              className="form-control border-primary shadow-sm"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email or phone number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control border-primary shadow-sm"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control border-primary shadow-sm"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold shadow-sm"
            style={{ transition: "0.3s ease" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#004080")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "")}
          >
            Sign Up
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-decoration-none text-primary fw-bold"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
