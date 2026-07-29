const express = require("express");

const {
    createSocial,
    getAllSocials,
    getSocialById,
    updateSocial,
    deleteSocial,
} = require("../controllers/SocialController");


const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getAllSocials);
router.get("/:id", getSocialById);

// Protected Routes
router.post("/", protect, createSocial);
router.put("/:id", protect, updateSocial);
router.delete("/:id", protect, deleteSocial);

module.exports = router;