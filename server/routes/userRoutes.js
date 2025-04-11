const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserRole, // <-- Add this import
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Role update (either public or protected depending on how you want it)
router.post("/role", updateUserRole); // <-- New route added here

// Protected Route
router.get("/profile", protect, getUserProfile);

module.exports = router;
