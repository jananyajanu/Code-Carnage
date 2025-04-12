const express = require("express");
const User = require("../models/User");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserRole,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Role update (either public or protected depending on how you want it)
router.post("/role", updateUserRole);

// Protected Route
router.get("/profile", protect, getUserProfile);

// Define the updateUserPoints function
const updateUserPoints = async (userId, points) => {
  try {
    await User.findByIdAndUpdate(userId, { $inc: { points: points } });
  } catch (err) {
    console.log("Error updating points:", err);
  }
};

// Export router and the updateUserPoints function together
module.exports = { router, updateUserPoints };
