const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  // updateUserRole,
  updateUserPoints,
  getLeaderboard,
} = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// // Log the functions to check if they're correctly imported (for debugging purposes)
// console.log(registerUser);
// console.log(loginUser);
// console.log(updateUserRole);

// Admin Route to update role — ideally this should be protected in future
// router.post("/role", updateUserRole); // Consider: protect, isAdmin

// Protected Routes
router.get("/profile", protect, (req, res) => {
  console.log("GET /api/user/profile hit");
  getUserProfile(req, res);
});

router.post("/updatePoints", protect, updateUserPoints); // Make sure updateUserPoints in controller accepts req.user
// Public Routes
router.post("/register", registerUser); // User registration
router.post("/login", loginUser); // User login

// Public leaderboard route
router.get("/leaderboard", getLeaderboard);

// Admin Route to update role — protected by admin middleware
// router.post("/role", protect, isAdmin, updateUserRole); // Added isAdmin check for admin-only route

// // Protected Routes
// router.get("/profile", protect, getUserProfile); // Get user profile
// router.patch("/updatePoints", protect, updateUserPoints); // PATCH for updating points (typically used for partial updates)

// Export router and the updateUserPoints function together
module.exports = router;
