const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";
    const filename = path.parse(file.originalname).name;

    return {
      folder: "myportfolio-vaibhav",

      resource_type: isPdf ? "raw" : "image",

      public_id: `${Date.now()}-${filename}${isPdf ? ".pdf" : ""}`,
    };
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
});

module.exports = upload;