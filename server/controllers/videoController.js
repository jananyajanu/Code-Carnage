const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

// @desc    Upload video
// @route   POST /api/videos/upload
// @access  Private
exports.uploadVideo = async (req, res) => {
  // Fake user ID in development
  const fakeDevUserId = "6637fbc5d8d8a3fa2a123456";
  const userId =
    process.env.NODE_ENV === "development" ? fakeDevUserId : req.user._id;

  const { title, description, topic } = req.body;
  const file = req.file;

  if (!title || !description || !topic) {
    return res
      .status(400)
      .json({ message: "Title, description, and topic are required" });
  }

  if (!file) return res.status(400).json({ message: "No file uploaded" });

  try {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "video", folder: "climate-videos" },
        async (error, result) => {
          if (error)
            return res
              .status(500)
              .json({ message: "Cloudinary upload failed", error });

          // ✅ Use consistent userId here
          const newVideo = new Video({
            title,
            description,
            topic,
            videoUrl: result.secure_url,
            uploadedBy: userId,
          });

          await newVideo.save();

          await User.findByIdAndUpdate(userId, {
            $push: { videos: newVideo._id },
          });

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

// @desc    Like or Unlike a video (like Instagram style)
// @route   POST /api/videos/:id/like
// @access  Private
exports.likeVideo = async (req, res) => {
  const videoId = req.params.id;
  const userId = req.user._id;

  try {
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Ensure video.likes is always an array
    if (!Array.isArray(video.likes)) {
      video.likes = [];
    }

    const alreadyLiked = video.likes.some(
      (likeId) => likeId.toString() === userId.toString()
    );

    if (alreadyLiked) {
      video.likes = video.likes.filter(
        (likeId) => likeId.toString() !== userId.toString()
      );
    } else {
      video.likes.push(userId);
    }

    await video.save();
    res
      .status(200)
      .json({ likes: video.likes.length, alreadyLiked: !alreadyLiked });
  } catch (err) {
    console.error("Error liking/unliking video:", err);
    res
      .status(500)
      .json({ message: "Failed to like/unlike the video", error: err });
  }
};
