import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token to localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/profile"); // redirect to profile page
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;