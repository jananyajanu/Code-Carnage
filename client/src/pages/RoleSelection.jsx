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
      <h2>Who are you?</h2>
      <p>Select your role to continue</p>
      <button
        className="btn btn-success m-3"
        onClick={() => handleRoleSelect("user")}
      >
        User
      </button>
      <button
        className="btn btn-warning m-3"
        onClick={() => handleRoleSelect("admin")}
      >
        Admin
      </button>
    </div>
  );
}

export default RoleSelection;
