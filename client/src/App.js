import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import UploadVideo from "./pages/UploadVideo";
import VideoFeed from "./pages/VideoFeed";
import Leaderboard from "./pages/Leaderboard";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/feed" element={<VideoFeed />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
