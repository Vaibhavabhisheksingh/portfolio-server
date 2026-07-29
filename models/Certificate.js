const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Certificate title is required"],
      trim: true,
    },

    issuer: {
      type: String,
      required: [true, "Issuer is required"],
      trim: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
    },

    // credentialId: {
    //   type: String,
    //   default: "",
    //   trim: true,
    // },

    credentialURL: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    image: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
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
  },
);

module.exports = mongoose.model("Certificate", certificateSchema);
