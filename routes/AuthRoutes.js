const express = require("express");

const { body } = require("express-validator");
const validate = require("../middleware/validation");

const {
  loginAdmin,
  getAdminProfile,
} = require("../controllers/AuthController");

const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

// Public Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email."),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  validate,
  loginAdmin,
);

// Protected Route
router.get("/profile", protect, getAdminProfile);

module.exports = router;
