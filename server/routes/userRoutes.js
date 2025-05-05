const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserRole,
  updateUserPoints,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin Route to update role — ideally this should be protected in future
router.post("/role", updateUserRole); // Consider: protect, isAdmin

// Protected Routes
router.get("/profile", protect, getUserProfile);
router.post("/updatePoints", protect, updateUserPoints); // Make sure updateUserPoints in controller accepts req.user


// Define the updateUserPoints function
const updateUserPoints = async (userId, points) => {
  try {
    await User.findByIdAndUpdate(userId, { $inc: { points: points } });
  } catch (err) {
    console.log("Error updating points:", err);
  }
};

// Export router and the updateUserPoints function together
module.exports = { userRoutes: router, updateUserPoints };
