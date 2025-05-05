const express = require("express");
const multer = require("multer");
const {
  uploadVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
} = require("../controllers/videoController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const storage = multer.memoryStorage(); // In-memory storage for videos
const upload = multer({ storage });

// Upload video (protected)
router.post("/upload", protect, upload.single("video"), uploadVideo);

// Publicly accessible routes for fetching videos
router.get("/", getAllVideos);
router.get("/:id", getVideoById);
router.post("/:id/like", protect, likeVideo);

module.exports = router;
