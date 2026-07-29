const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      unique: true,
    },

    category: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "Programming Language",
        "Tools",
        "DevOps",
        "Cloud",
        "Version Control",
        "Other",
      ],
      required: true,
    },

    proficiency: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    icon: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Skill", skillSchema);