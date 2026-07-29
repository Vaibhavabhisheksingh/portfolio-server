const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
    },

    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },

    fieldOfStudy: {
      type: String,
      required: [true, "Field of study is required"],
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    currentlyStudying: {
      type: Boolean,
      default: false,
    },

    grade: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: [String],
      default: [],
    },

    institutionLogo: {
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

module.exports = mongoose.model("Education", educationSchema);
