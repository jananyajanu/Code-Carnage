const express = require("express");
const http = require("http"); // Add this
const { Server } = require("socket.io"); // Add this
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes"); // Make sure this exists
const { updateUserPoints } = require("./controllers/userController");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Wrap app in HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins — adjust for production
    methods: ["GET", "POST"]
  }
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log("🟢 A user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg );// Broadcast to all clients
  });

  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });               

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected");
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🌍 Climate Platform Backend is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/challenge", challengeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

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
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

});


