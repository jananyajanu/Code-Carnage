import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const location = useLocation();
  const role = new URLSearchParams(location.search).get("role") || "student";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Signup", form, "Role:", role);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Signup as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
      <form className="p-4 shadow-sm border rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Username" name="username" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email or Phone" name="email" onChange={handleChange} required />
        </div>
        {/* <div className="mb-3">
          <select className="form-control" name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div> */}
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        <div className="mt-3 text-center">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
