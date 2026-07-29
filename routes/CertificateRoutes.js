const express = require("express");
const upload = require("../middleware/upload");

const {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
} = require("../controllers/CertificateController");

const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getAllCertificates);
router.get("/:id", getCertificateById);

// Protected Routes
router.post("/", protect, upload.single("image"), createCertificate);

router.put("/:id", protect, upload.single("image"), updateCertificate);
router.delete("/:id", protect, deleteCertificate);

module.exports = router;
