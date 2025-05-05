import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Homepage from "./pages/HomePage.jsx";
import UploadVideo from "./pages/UploadVideo.jsx";
import Profile from "./pages/Profile.jsx"; // ⬅️ Import Profile page

function App() {
  return (
    <div className="bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<Homepage />} />
        
        
        <Route path="/UploadVideo" element={<UploadVideo />} />
        
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        
      </Routes>
    </div>
  );
}

export default App;
