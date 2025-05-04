import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profilepage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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
    <div className="bg-secondary min-h-screen py-10 px-4 sm:px-8 lg:px-20">
      <div className="max-w-3xl mx-auto bg-primary text-accent p-6 sm:p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          👤 User Profile
        </h2>

        <div className="mb-6 space-y-2 text-lg">
          <p>
            <span className="font-semibold">Name:</span> {userData.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
          <p>
            <span className="font-semibold">Level:</span> {userData.level}
          </p>
          <p>
            <span className="font-semibold">Points Earned:</span>{" "}
            {userData.points}
          </p>

          <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
            <div
              className="bg-accent h-4 rounded-full"
              style={{ width: `${Math.min(userData.points, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-3">📹 Uploaded Videos</h3>
          {userData.videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userData.videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-accent text-accent shadow-md"
                >
                  <div className="h-40 bg-gray-100 rounded-md mb-2 flex items-center justify-center text-sm text-gray-500">
                    Thumbnail Placeholder
                  </div>
                  <h4 className="font-semibold">{video.title}</h4>
                  <p className="text-sm text-gray-600">
                    Uploaded on:{" "}
                    {new Date(video.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-center">No videos uploaded yet.</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
          <button
            onClick={() => navigate("/leaderboard")}
            className="bg-accent text-white font-medium px-6 py-3 rounded-xl hover:bg-secondary transition-all duration-300"
          >
            🏆 View Leaderboard
          </button>

          <button
            onClick={() => navigate("/points-info")}
            className="bg-white text-accent border-2 border-accent font-medium px-6 py-3 rounded-xl hover:bg-accent hover:text-white transition-all duration-300"
          >
            📈 How Points Are Awarded
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
