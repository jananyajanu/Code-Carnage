const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  points: { type: Number, required: true },
  type: { type: String, enum: ["quiz", "reel"], required: true },
  deadline: Date,
});

module.exports = mongoose.model("Challenge", challengeSchema);
