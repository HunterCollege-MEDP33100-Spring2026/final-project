var mongoose = require("mongoose");

var entrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["food", "park", "art", "music", "shopping", "nightlife", "other"],
    },
    lat: {
      type: Number,
      default: null,
    },
    lng: {
      type: Number,
      default: null,
    },
    submittedBy: {
      type: String,
      default: "anonymous",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
