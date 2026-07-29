const express = require("express");
const upload = require("../middleware/upload");

const {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} = require("../controllers/ExperienceController");


const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);

// Protected Routes
router.post("/", protect, upload.single("companyLogo"), createExperience);

router.put("/:id",protect, upload.single("companyLogo"), updateExperience);
router.delete("/:id", protect, deleteExperience);

module.exports = router;
