import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("topic", topic);

    try {
      setLoading(true);
      setError(null);
      await axios.post("/api/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (err) {
      setError("Failed to upload video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Upload Video</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            required
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
