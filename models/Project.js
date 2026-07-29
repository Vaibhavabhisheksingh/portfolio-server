const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    techStack: [
      {
        type: String,
        trim: true,
      },
    ],

    category: {
      type: String,
      enum: [
        "Full Stack",
        "Frontend",
        "Backend",
        "MERN",
        "AI/ML",
        "Java",
        "Python",
        "Other",
      ],
      default: "Other",
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    githubLink: {
      type: String,
      default: "",
    },

    liveDemo: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Completed", "In Progress"],
      default: "Completed",
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

module.exports = mongoose.model("Project", projectSchema);