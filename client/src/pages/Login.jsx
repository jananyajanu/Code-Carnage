import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", loginForm);
      alert("Login successful!");
      localStorage.setItem("userToken", res.data.token);
      window.location.href = "/Homepage";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm" onSubmit={handleLogin}>
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
            placeholder="Email"
            name="email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
            placeholder="Password"
            name="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
          Login
        </button>
        <div className="mt-3 text-center">
          <Link to="/forgot-password" className="text-sm text-blue-400">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
