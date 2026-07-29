const express = require("express");

const upload = require("../middleware/upload");
const protect = require("../middleware/AuthMiddleware");

const { uploadImage } = require("../controllers/UploadController");


const router = express.Router();

router.post(
    "/image",
    protect,
    upload.single("image"),
    uploadImage
);

module.exports = router;