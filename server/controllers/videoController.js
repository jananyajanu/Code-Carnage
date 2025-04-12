const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary");

// @desc    Upload video
// @route   POST /api/videos/upload
// @access  Private
exports.uploadVideo = async (req, res) => {
  const { title, description, topic } = req.body;

  // Ensure the necessary fields are present
  if (!title || !description || !topic) {
    return res
      .status(400)
      .json({ message: "Title, description, and topic are required" });
  }

  try {
    if (!req.file)
      return res.status(400).json({ message: "No video file uploaded" });

    // Upload video to Cloudinary
    cloudinary.uploader
      .upload_stream(
        { resource_type: "video", folder: "climate-videos" },
        async (error, result) => {
          if (error)
            return res
              .status(500)
              .json({ message: "Cloudinary upload failed", error });

          // Create new video entry in the database
          const newVideo = new Video({
            title,
            description,
            topic,
            videoUrl: result.secure_url, // Cloudinary URL of the uploaded video
            uploadedBy: req.user._id,
          });

          // Save the new video in the database
          await newVideo.save();

          // Return the newly created video data
          res.status(201).json(newVideo);
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.error("Video upload error:", err);
    res.status(500).json({ message: "Video upload failed", error: err });
  }
};

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
exports.getAllVideos = async (req, res) => {
  try {
    // Fetch all videos with their uploader details
    const videos = await Video.find().populate("uploadedBy", "username role");
    res.json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ message: "Failed to fetch videos", error: err });
  }
};

// @desc    Get single video by ID
// @route   GET /api/videos/:id
// @access  Public
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "uploadedBy",
      "username role"
    );
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    console.error("Error fetching video:", err);
    res.status(500).json({ message: "Error fetching video", error: err });
  }
};
