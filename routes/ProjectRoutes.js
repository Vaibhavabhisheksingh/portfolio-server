const express = require("express");
const upload = require("../middleware/upload");

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/ProjectController");

const protect = require("../middleware/AuthMiddleware");


const router = express.Router();

// Public Routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Protected Routes
// router.post("/", protect, createProject);
// router.put("/:id", protect, updateProject);
router.post(
  "/",
  protect,
  upload.single("image"),
  createProject
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProject
);
router.delete("/:id", protect, deleteProject);

module.exports = router;