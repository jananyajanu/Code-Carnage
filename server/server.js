const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Importing routes
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const { updateUserPoints } = require("./controllers/userController");


// Import updateUserPoints from controller
const { updateUserPoints } = require("./controllers/userController"); // ✅ Correct source

// Test route
app.get("/", (req, res) => {
  res.send("🌍 Climate Platform Backend is running...");
});

<<<<<<< HEAD
// API Routes
app.use("/api/user", userRoutes);
=======
// Your routes (plug these in once you’re ready)
app.use("/api/users", userRoutes);  // Add this line to use the userRoutes
>>>>>>> 40212e6 (updated signup)
app.use("/api/videos", videoRoutes);
app.use("/api/challenge", challengeRoutes);
app.use("/api/leaderboard", leaderboardRoutes); // ✅ Optional, but useful

// Update points endpoint
app.post("/api/update-points", async (req, res) => {
  const { userId, points } = req.body;

  try {
    await updateUserPoints(userId, points);
    res.status(200).send("Points updated successfully");
  } catch (err) {
    console.error("Error updating points:", err);
    res.status(500).send("Error updating points");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
