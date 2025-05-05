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

// Test route
app.get("/", (req, res) => {
  res.send("🌍 Climate Platform Backend is running...");
});

// API Routes
app.use("/api/user", userRoutes);
// app.use("/api/videos", videoRoutes);
app.use("/api/challenge", challengeRoutes);

// Update points endpoint (if needed outside userRoutes)
app.post("/api/update-points", async (req, res) => {
  const { userId, points } = req.body;

  try {
    await updateUserPoints(userId, points); // If you need this endpoint, keep it
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
