import React from "react";
import { useNavigate } from "react-router-dom";

const ReelUpload = ({ category }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/post"); // Adjust path if your post page is at a different route
  };

  return (
    <div className="bg-green-300 p-4 rounded-xl">
      <h3 className="text-lg font-semibold mb-2">Upload Your Reel - {category}</h3>
      <button
        onClick={handleRedirect}
        className="mt-4 bg-secondary hover:bg-green-700 px-4 py-2 rounded text-white"
      >
        Upload
      </button>
    </div>
  );
};

export default ReelUpload;
