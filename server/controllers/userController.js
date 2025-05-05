const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Register new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password, role });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
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
    res.status(500).json({ message: "Login failed" });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("videos")
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.username,
      email: user.email,
      videos: user.videos,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

// @desc    Update user role
// @route   POST /api/users/role
// @access  Public or Private (depending on your use case)
const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Role updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update role" });
  }
};

// @desc    Update user points
// @route   POST /api/users/updatePoints
// @access  Private
const updateUserPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    const { points } = req.body;

    if (!points) {
      return res.status(400).json({ message: "Points are required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { points: points } },
      { new: true }
    );

    res.status(200).json({ message: "Points updated", user });
  } catch (err) {
    console.error("Error updating points:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserRole,
  updateUserPoints, // ✅ Now it’s actually defined
};
