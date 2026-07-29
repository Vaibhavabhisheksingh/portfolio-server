const express = require("express");
const upload = require("../middleware/upload");

const {
  getSettings,
  updateSettings,
} = require("../controllers/SettingController");

const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

// Public
router.get("/", getSettings);

// Protected
router.put(
  "/",
  protect,
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  updateSettings,
);

module.exports = router;
