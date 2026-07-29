const Contact = require("../models/Contact");

// ===========================
// Send Contact Message
// ===========================
const sendMessage = async (req, res) => {
  try {
    //const contact = await Contact.create(req.body);
    const contact = await Contact.create({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || "",
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===========================
// Get All Messages
// ===========================
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===========================
// Get Message By ID
// ===========================
const getMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===========================
// Mark As Read
// ===========================
const markAsRead = async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Marked as read.",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===========================
// Delete Message
// ===========================
const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getAllMessages,
  getMessageById,
  markAsRead,
  deleteMessage,
};
