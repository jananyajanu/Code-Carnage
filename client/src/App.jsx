import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./pages/VideoFeed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import RoleSelection from "./pages/RoleSelection"; // adjust the path as needed

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/select-role" element={<RoleSelection />} />
      <Route
        path="/feed"
        element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
