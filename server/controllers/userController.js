const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Register new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password, role });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

// @desc    Login user
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Error in loginUser:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "videos", // ✅ Correct field name from User schema
        select: "videoUrl title createdAt", // Only needed fields
      })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Map videos to essential fields only
    const videos = (user.uploadedVideos || []).map((video) => ({
      videoUrl: video.videoUrl,
      title: video.title,
      uploadedAt: video.createdAt,
    }));

    res.json({
      name: user.name,
      email: user.email,
      points: user.points,
      videos: user.videos,
    });
  } catch (err) {
    console.error("Error in getUserProfile:", err);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

// @desc    Update user points
// @route   POST /api/users/updatePoints
// @access  Private
const updateUserPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    const { points } = req.body;

    if (typeof points !== "number") {
      return res.status(400).json({ message: "Points must be a number" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { points } },
      { new: true }
    );

    res.status(200).json({ message: "Points updated", user });
  } catch (err) {
    console.error("Error in updateUserPoints:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc    Get top 10 users by points
// @route   GET /user/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ points: -1 }) // highest to lowest
      .limit(10)
      .select("username email points"); // Only return needed fields

    res.json(topUsers);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserPoints,
  getLeaderboard,
};
