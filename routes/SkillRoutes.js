const express = require("express");

const {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} = require("../controllers/SkillController");


const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getAllSkills);
router.get("/:id", getSkillById);

// Protected Routes
router.post("/", protect, createSkill);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

module.exports = router;