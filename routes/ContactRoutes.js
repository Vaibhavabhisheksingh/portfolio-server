const express = require("express");

const {
    sendMessage,
    getAllMessages,
    getMessageById,
    markAsRead,
    deleteMessage,
} = require("../controllers/ContactController");

const { contactLimiter } = require("../middleware/rateLimiter");

const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

// Public
router.post("/",  contactLimiter, sendMessage);

// Admin
router.get("/", protect, getAllMessages);

router.get("/:id", protect, getMessageById);

router.put("/:id/read", protect, markAsRead);

router.delete("/:id", protect, deleteMessage);

module.exports = router;