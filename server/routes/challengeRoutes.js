const express = require("express");
const router = express.Router();

const Challenge = require("../models/Challenge");
const User = require("../models/User");
const { updateUserPointsInDatabase } = require("../controllers/userController"); // Corrected name

// @desc    Fetch all challenges
// @route   GET /api/challenge
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (err) {
    console.error("Error fetching challenges:", err);
    res.status(500).json({ message: "Failed to load challenges" });
  }
});

// @desc    Create a new challenge
// @route   POST /api/challenge
router.post("/", async (req, res) => {
  const { title, description, points, type, deadline } = req.body;

  try {
    const challenge = new Challenge({ title, description, points, type, deadline });
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    console.error("Error creating challenge:", err);
    res.status(400).json({ message: "Error creating challenge" });
  }
});

// @desc    Complete a challenge (update points + badge)
// @route   POST /api/challenge/complete
router.post("/complete", async (req, res) => {
  const { userId, challengePoints, badge } = req.body;

  try {
    // Update user points
    await updateUserPointsInDatabase(userId, challengePoints);

    // Handle badge update if provided
    const user = await User.findById(userId);
    if (badge && !user.badges.includes(badge)) {
      user.badges.push(badge);
      await user.save();
    }

    // Return updated user data
    const updatedUser = await User.findById(userId);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error completing challenge:", err);
    res.status(500).json({ message: "Error completing challenge", error: err.message });
  }
});

// ✅ Export the router
module.exports = router;
