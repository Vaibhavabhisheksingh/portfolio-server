const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Internship",
        "Freelance",
        "Contract",
        "Self-Employed",
      ],
      default: "Internship",
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      default: "Remote",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    description: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },
    companyLogo: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Experience", experienceSchema);
