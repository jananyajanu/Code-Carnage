const express = require("express");
const multer = require("multer");
const {
  uploadVideo,
  getAllVideos,
  getVideoById,
} = require("../controllers/videoController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload video (protected)
router.post("/upload", protect, upload.single("video"), uploadVideo);

// Publicly accessible
router.get("/", getAllVideos);
router.get("/:id", getVideoById);

module.exports = router;
