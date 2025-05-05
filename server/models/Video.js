// server/models/Video.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    // Add this field to the videoSchema
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true }, // You can store a Cloudinary URL or path
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: { type: String, required: true }, // e.g. "Water", "Waste", etc.
    //views: { type: Number, default: 0 },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    challenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge", // Reference to the Challenge model
      },
    ],

    //approved: { type: Boolean, default: false }, // Only admin can approve
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
