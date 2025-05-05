const Challenge = require("../models/Challenge");
const User = require("../models/User");
const { updateUserPoints } = require("./userController"); // Ensure this is exported properly

// Fetch all challenges
exports.getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (err) {
    res.status(500).json({ message: "Failed to load challenges" });
  }
};

// Create a new challenge
exports.createChallenge = async (req, res) => {
  const { title, description, points, type, deadline } = req.body;
  try {
    const challenge = new Challenge({ title, description, points, type, deadline });
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ message: "Error creating challenge" });
  }
};

// Complete a challenge (update user points & badges)
exports.completeChallenge = async (req, res) => {
  const { userId, challengePoints, badge } = req.body;

  try {
    // Step 1: Add points
    await updateUserPoints(userId, challengePoints);

    // Step 2: Add badge if not already there
    const user = await User.findById(userId);
    if (badge && !user.badges.includes(badge)) {
      user.badges.push(badge);
      await user.save();
    }

    // Step 3: Return updated user
    const updatedUser = await User.findById(userId);
    res.json(updatedUser);
  } catch (err) {
    console.error("Error completing challenge:", err);
    res.status(500).json({ message: "Error completing challenge", error: err.message });
  }
};
