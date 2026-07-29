const express = require("express");
const upload = require("../middleware/upload");

const {
  createEducation,
  getAllEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
} = require("../controllers/EducationController");


const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/", getAllEducations);
router.get("/:id", getEducationById);

router.post("/",protect, upload.single("institutionLogo"), createEducation);

router.put("/:id", protect, upload.single("institutionLogo"), updateEducation);
router.delete("/:id", protect, deleteEducation);

module.exports = router;
