const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { updateUserPoints } = require("../controllers/userController"); // Ensure this is exported correctly

// Endpoint for completing a challenge
router.post("/complete", async (req, res) => {
  const { userId, challengePoints, badge } = req.body; // Receive userId, points, and badge data from the client

  try {
    // Update the user's points (you could also check if they have already completed the challenge)
    await updateUserPoints(userId, challengePoints);

    // If a badge is provided, assign it
    if (badge) {
      const user = await User.findById(userId);
      if (!user.badges.includes(badge)) {
        user.badges.push(badge);
        await user.save();
      }
    }

    // Fetch the updated user data
    const updatedUser = await User.findById(userId);

    // Return the updated user data as a response
    res.json(updatedUser);
  } catch (err) {
    console.error("Error completing challenge:", err);
    res
      .status(500)
      .json({ message: "Error completing challenge", error: err.message });
  }
});

module.exports = router;
