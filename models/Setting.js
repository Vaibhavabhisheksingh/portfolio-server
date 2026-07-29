const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    // Personal Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    profession: {
      type: String,
      required: true,
      trim: true,
    },

    tagline: {
      type: String,
      default: "",
      trim: true,
    },

    about: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    // Hero Section
    heroTitle: {
      type: String,
      default: "",
      trim: true,
    },

    heroSubtitle: {
      type: String,
      default: "",
      trim: true,
    },

    // Profile Image
    profileImage: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    // Resume
    resume: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
      originalName: {
        type: String,
        default: "",
      },
    },

    // SEO
    seoTitle: {
      type: String,
      default: "",
      trim: true,
    },

    seoDescription: {
      type: String,
      default: "",
      trim: true,
    },

    seoKeywords: [
      {
        type: String,
        trim: true,
      },
    ],

    // Theme
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "dark",
    },

    // Portfolio Status
    portfolioStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Setting", settingSchema);
