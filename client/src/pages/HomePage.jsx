import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance"; // Adjust the path to where axiosInstance is located

const Home = () => {
  const [videos, setVideos] = useState([]);

  // Fetch videos from the backend
  const fetchVideos = async () => {
    try {
      const res = await axiosInstance.get("/videos"); // Using axiosInstance
      setVideos(res.data); // Store videos in the state
    } catch (err) {
      console.error("Failed to fetch videos", err);
    }
  };

  const handleLike = async (videoId) => {
    try {
      const res = await axiosInstance.post(`/videos/${videoId}/like`);
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId
            ? {
                ...video,
                likes: res.data.likes, // number of likes
                alreadyLiked: res.data.alreadyLiked, // toggle like status
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
        const res = await axiosInstance.get("/videos"); // Fetch videos from backend
        const currentUserId = "6637fbc5d8d8a3fa2a123456"; // Static dev-mode user ID

        // Process and map videos to include like status and sorted by createdAt (newest first)
        const videosWithLikeStatus = res.data
          .map((video) => ({
            ...video,
            alreadyLiked: video.likes?.includes(currentUserId), // Check if the current user already liked this video
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt, descending

        setVideos(videosWithLikeStatus); // Set the sorted videos with like status
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };

    fetchVideos(); // Call the function when the component mounts
  }, []); // Empty dependency array to run this once when the component is first loaded

  return (
    <div className="p-6 bg-[#e6f4ea] min-h-screen mb-10">
      <h1 className="text-3xl font-bold text-[#1b5e20] mb-6 text-center">
        🌿 Climate Action Videos
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white shadow-md border border-[#34a853] rounded-lg overflow-hidden"
          >
            <video
              src={video.videoUrl}
              controls
              className="w-full h-64 object-cover"
            ></video>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#1b5e20]">
                {video.title}
              </h2>
              <p className="text-gray-700 mt-1">{video.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-500">
                  Topic: {video.topic}
                </span>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
