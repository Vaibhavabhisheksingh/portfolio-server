const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: [true, "Platform name is required"],
      unique: true,
      enum: [
        "GitHub",
        "LinkedIn",
        "Portfolio",
        "Twitter",
        "Instagram",
        "Facebook", 
        "YouTube",
        "LeetCode",
        "Codeforces",
        "CodeChef",
        "HackerRank",
        "GeeksforGeeks",
        "Medium",
        "Dev.to",
        "Email",
        "Other",
      ],
    },

    username: {
      type: String,
      default: "",
      trim: true,
    },

    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
    },

    icon: {
      type: String,
      trim: true,
      default: "",
    },

    featured: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Social", socialSchema);