import React from "react";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="role-selection text-center p-5">
      <h2>Who are you?</h2>
      <p>Select your role to continue</p>
      <button className="btn btn-success m-3" onClick={() => navigate("/signup?role=student")}>Student</button>
      <button className="btn btn-warning m-3" onClick={() => navigate("/signup?role=admin")}>Admin</button>
    </div>
  );
}

export default RoleSelection;
