import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get role from URL or localStorage fallback
    const role =
      new URLSearchParams(window.location.search).get("role") ||
      localStorage.getItem("selectedRole") ||
      "user";

    try {
      const res = await axios.post("/users/register", {
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.emailOrPhone,
        password: formData.password,
        role: role,
      });

      alert("Registration successful! Please login.");
      window.location.href = "/login"; // or use useNavigate
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4 rounded-4">
        <h3 className="text-center mb-4 text-primary">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control border-primary shadow-sm"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control border-primary shadow-sm"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email or Phone</label>
            <input
              type="text"
              className="form-control border-primary shadow-sm"
              name="emailOrPhone"
              value={formData.emailOrPhone}
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
