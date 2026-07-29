const express = require("express");

const {
    getDashboardStats,
    getRecentMessages,
    getRecentProjects,
} = require("../controllers/DashboardController");

const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/stats", protect, getDashboardStats);

router.get("/recent-messages", protect, getRecentMessages);

router.get("/recent-projects", protect, getRecentProjects);

module.exports = router;