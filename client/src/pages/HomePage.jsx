import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  const handleLike = async (videoId) => {
    try {
      const res = await axiosInstance.post(`/videos/${videoId}/like`);
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId
            ? {
                ...video,
                likes: res.data.likes,
                alreadyLiked: res.data.alreadyLiked,
              }
            : video
        )
      );
    } catch (err) {
      console.error("Error updating like status", err);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/videos");
        const currentUserId = "6637fbc5d8d8a3fa2a123456"; // example user
        const sortedVideos = res.data
          .map((video) => ({
            ...video,
            alreadyLiked: video.likes?.includes(currentUserId),
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // recent first

        setVideos(sortedVideos);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-[#e6f4ea] p-4 mb-10">
      <h1 className="text-3xl text-green-800 font-semibold text-center mb-6">
        Latest Climate Videos
      </h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white shadow-md rounded-lg p-4">
            <video
              src={video.videoUrl}
              controls
              className="w-full h-64 object-cover rounded-md mb-3"
            ></video>
            <h2 className="text-xl font-semibold text-[#1b5e20]">
              {video.title}
            </h2>
            <p className="text-gray-700 mt-1">{video.description}</p>
            <p className="text-green-600 text-sm font-medium mt-1">
              #{video.topic}
            </p>
            <p className="text-gray-500 text-xs mb-2">
              Uploaded by: {video.uploadedBy?.username || "Unknown"}
            </p>
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => handleLike(video._id)}
                className={`text-sm px-3 py-1 rounded transition 
                ${
                  video.alreadyLiked
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-[#34a853] hover:bg-[#1b5e20]"
                } 
                text-white`}
              >
                {video.alreadyLiked ? "❤️" : "👍"} {video.likes ?? 0}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
