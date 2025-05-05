const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { userRoutes } = require("./routes/userRoutes"); // Adjust the path if needed

dotenv.config();

// Importing the routes and the updateUserPoints function
const cloudinary = require("./config/cloudinary");
// const { router: userRoutes, updateUserPoints } = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// app.use(cors());
// app.use(express.json()); // Parse incoming JSON

const allowedOrigins = ["http://localhost:3000"]; // Add your frontend URL

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json()); // 👈 This is critical
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("🌍 Climate Platform Backend is running...");
});

app.use("/api/user", userRoutes); // Add this line to use the userRoutes
app.use("/api/videos", videoRoutes);
app.use("/api/challenge", challengeRoutes);
// app.use("/api/leaderboard", leaderboardRoutes); // ✅ Optional, but useful

// // Update points endpoint
// app.post("/api/update-points", async (req, res) => {
//   const { userId, points } = req.body;

//   try {
//     await updateUserPoints(userId, points);
//     res.status(200).send("Points updated successfully");
//   } catch (err) {
//     console.error("Error updating points:", err);
//     res.status(500).send("Error updating points");
//   }
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
