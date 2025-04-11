// server/routes/videoRoutes.js
const express = require("express");
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.send("Video route works!");
});

module.exports = router;
