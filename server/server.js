// server/server.js

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

// Test route
app.get("/", (req, res) => {
  res.send("🌍 Climate Platform Backend is running...");
});

// Your routes (plug these in once you’re ready)
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
