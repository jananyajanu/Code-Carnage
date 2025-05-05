const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  // Checking if the token is provided in the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verifying the token using the JWT_SECRET from the environment
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetching the user from the database and attaching it to the request object (excluding the password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handling token-related errors
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin authorization middleware
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next(); // User is an admin, proceed to next middleware/route handler
  } else {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
};
