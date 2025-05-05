const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Get profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Update role
exports.updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.error("Update role error:", error);
    res.status(500).json({ message: "Server error updating role" });
  }
};

// Update points via route
exports.updateUserPoints = async (req, res) => {
  const { points } = req.body;

  try {
    await User.findByIdAndUpdate(req.user._id, { $inc: { points } });
    res.status(200).json({ message: "Points updated successfully" });
  } catch (err) {
    console.log("Error updating points:", err);
    res.status(500).json({ message: "Server error updating points" });
  }
};

// Reusable for other modules
exports.updateUserPointsInDatabase = async (userId, points) => {
  try {
    await User.findByIdAndUpdate(userId, { $inc: { points } });
  } catch (err) {
    console.error("Error in updateUserPointsInDatabase:", err);
    throw err;
  }
};
