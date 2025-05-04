import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./pages/VideoFeed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import RoleSelection from "./pages/RoleSelection";
import Homepage from "./pages/HomePage";
import UploadVideo from "./pages/UploadVideo";
import ProfilePanel from "./pages/ProfilePanel";

function App() {
  return (
    <div className="bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/select-role" element={<RoleSelection />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/UploadVideo" element={<UploadVideo />} />
        <Route path="/ProfilePanel" element={<ProfilePanel />} />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
