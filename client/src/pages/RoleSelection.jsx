import React from "react";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // Save role locally for future use (optional)
    localStorage.setItem("selectedRole", role);

    // Navigate to signup page with role as query param
    navigate(`/signup?role=${role}`);
  };

  return (
    <div className="role-selection text-center p-5">
      <h2 className="text-3xl font-bold mb-4">Who are you?</h2>
      <p className="text-lg mb-6">Select your role to continue</p>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 m-3"
        onClick={() => handleRoleSelect("user")}
      >
        User
      </button>
      <button
        className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 m-3"
        onClick={() => handleRoleSelect("admin")}
      >
        Admin
      </button>
    </div>
  );
}

export default RoleSelection;
