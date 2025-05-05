// backend/controllers/leaderboardController.js
const User = require("../models/User");

// Get the leaderboard (sorted by points)
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ points: -1 }); // Sort by points in descending order
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
};
