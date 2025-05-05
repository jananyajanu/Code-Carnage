import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleReplaceVideo = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      setError("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("topic", topic);

    try {
      setLoading(true);
      setError(null);

      await axios.post("/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/home");
    } catch (err) {
      console.error("Upload error:", err);

      // Try to get a more descriptive error message
      let message = "An unexpected error occurred while uploading.";

      if (err.response) {
        if (err.response.data?.message) {
          message = err.response.data.message;
        } else if (typeof err.response.data === "string") {
          message = err.response.data;
        } else {
          message = `Upload failed with status ${err.response.status}`;
        }
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e6f4ea] flex items-center justify-center p-4  mb-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">
          Upload Your Video
        </h2>

        {!previewURL ? (
          <div
            className="border-2 border-dashed border-green-500 rounded-md p-6 text-center text-green-600 cursor-pointer hover:bg-green-50 transition"
            onClick={handleClickUpload}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            Click or drag video to upload
          </div>
        ) : (
          <div className="mb-4">
            <video
              src={previewURL}
              controls
              className="w-full border-2 border-green-500 rounded-md mb-2"
            />
            <button
              type="button"
              onClick={handleReplaceVideo}
              className="w-full text-green-700 border border-green-500 py-1 rounded-md hover:bg-green-100 transition"
            >
              Replace Video
            </button>
          </div>
        )}

        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          hidden
        />

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-green-500 rounded-md bg-white text-green-800 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-green-500 rounded-md bg-white text-green-800 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Topic (e.g. #climate, #waste)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="w-full p-2 border border-green-500 rounded-md bg-white text-green-800 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-md transition ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-600 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default UploadVideo;
