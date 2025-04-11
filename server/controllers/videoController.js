const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary");

// @desc    Upload video
// @route   POST /api/videos/upload
// @access  Private
exports.uploadVideo = async (req, res) => {
  const { title, description, topic } = req.body;

  try {
    if (!req.file)
      return res.status(400).json({ message: "No video file uploaded" });

    cloudinary.uploader
      .upload_stream(
        { resource_type: "video", folder: "climate-videos" },
        async (error, result) => {
          if (error)
            return res
              .status(500)
              .json({ message: "Cloudinary upload failed" });

          const newVideo = await Video.create({
            title,
            description,
            topic,
            videoUrl: result.secure_url,
            uploadedBy: req.user._id,
          });

          res.status(201).json(newVideo);
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Video upload failed" });
  }
};

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("uploadedBy", "username role");
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos" });
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
    res.status(500).json({ message: "Error fetching video" });
  }
};
