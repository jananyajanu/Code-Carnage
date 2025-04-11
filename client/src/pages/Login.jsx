import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    // Your login logic
    console.log("Login", loginForm);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form className="p-4 shadow-sm border rounded" onSubmit={handleLogin}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Username" name="username" onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} required />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" name="password" onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Login</button>
        <div className="mt-3 text-center">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
