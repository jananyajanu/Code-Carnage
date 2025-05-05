import React, { useEffect, useState } from "react";
import Board from "../components/Leaderboard/Board"; // Adjust path if needed
import PointsInfo from "../components/PointsInfo"; // Make sure the path is correct


const Profilepage = () => {
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState("none"); // 'leaderboard' or 'points'

  useEffect(() => {
    const dummyData = {
      name: "John Doe",
      email: "john.doe@example.com",
      points: 120,
      level: "Eco Enthusiast",
      videos: [
        { title: "How to Recycle", uploadedAt: new Date().toISOString() },
        { title: "Solar Energy Tips", uploadedAt: new Date().toISOString() },
      ],
    };
    setUserData(dummyData);
  }, []);

  if (!userData)
    return (
      <p className="text-center text-lg text-gray-600 mt-10">Loading...</p>
    );

  return (
    <div className="bg-green-100 min-h-screen py-10 px-4 sm:px-8 lg:px-20">
      <div className="max-w-3xl mx-auto bg-primary text-accent p-6 sm:p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          👤 User Profile
        </h2>

        {/* User Info */}
        <div className="mb-6 space-y-2 text-lg">
          <p><span className="font-semibold">Name:</span> {userData.name}</p>
          <p><span className="font-semibold">Email:</span> {userData.email}</p>
          <p><span className="font-semibold">Level:</span> {userData.level}</p>
          <p><span className="font-semibold">Points Earned:</span> {userData.points}</p>

          <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
            <div className="bg-accent h-4 rounded-full" style={{ width: `${Math.min(userData.points, 100)}%` }}></div>
          </div>
        </div>

        {/* Uploaded Videos */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-3">📹 Uploaded Videos</h3>
          {userData.videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userData.videos.map((video, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-accent text-accent shadow-md">
                  <div className="h-40 bg-gray-100 rounded-md mb-2 flex items-center justify-center text-sm text-gray-500">
                    Thumbnail Placeholder
                  </div>
                  <h4 className="font-semibold">{video.title}</h4>
                  <p className="text-sm text-gray-600">Uploaded on: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-center">No videos uploaded yet.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveSection("leaderboard")}
            className={`font-medium px-6 py-3 rounded-xl transition-all duration-300 ${
              activeSection === "leaderboard"
                ? "bg-accent text-white"
                : "bg-white text-accent border-2 border-accent hover:bg-accent hover:text-white"
            }`}
          >
            🏆 View Leaderboard
          </button>

          <button
            onClick={() => setActiveSection("points")}
            className={`font-medium px-6 py-3 rounded-xl transition-all duration-300 ${
              activeSection === "points"
                ? "bg-accent text-white"
                : "bg-white text-accent border-2 border-accent hover:bg-accent hover:text-white"
            }`}
          >
            📈 How Points Are Awarded
          </button>
        </div>

        {/* Conditionally Rendered Section */}
        {activeSection === "leaderboard" && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4 text-center">🏆 Global Leaderboard</h3>
            <Board />
          </div>
        )}

        {activeSection === "points" && (
          <div className="mt-10">
            <PointsInfo />
          </div>
        )}

      </div>
    </div>
  );
};

export default Profilepage;
