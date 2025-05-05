const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserRole,
  updateUserPoints,
} = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// // Log the functions to check if they're correctly imported (for debugging purposes)
// console.log(registerUser);
// console.log(loginUser);
// console.log(updateUserRole);

// Public Routes
router.post("/register", registerUser); // User registration
router.post("/login", loginUser); // User login

// Admin Route to update role — protected by admin middleware
router.post("/role", protect, isAdmin, updateUserRole); // Added isAdmin check for admin-only route

// Protected Routes
router.get("/profile", protect, getUserProfile); // Get user profile
router.patch("/updatePoints", protect, updateUserPoints); // PATCH for updating points (typically used for partial updates)

module.exports = router;
