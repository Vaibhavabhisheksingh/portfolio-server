const Setting = require("../models/Setting");
const cloudinary = require("../config/cloudinary");

// ==============================================
// Get Portfolio Settings
// ==============================================

const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne();

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Portfolio settings not found.",
      });
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================================
// Update Portfolio Settings
// ==============================================

const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    const updateData = { ...req.body };

    if (typeof updateData.seoKeywords === "string") {
      updateData.seoKeywords = JSON.parse(updateData.seoKeywords);
    }

    if (updateData.portfolioStatus !== undefined) {
      updateData.portfolioStatus =
        updateData.portfolioStatus === "true";
    }

    // Profile image
    if (req.files?.profileImage?.length) {
      if (settings?.profileImage?.public_id) {
        await cloudinary.uploader.destroy(
          settings.profileImage.public_id
        );
      }

      updateData.profileImage = {
        url: req.files.profileImage[0].path,
        public_id: req.files.profileImage[0].filename,
      };
    }

    // Resume
    if (req.files?.resume?.length) {
      if (settings?.resume?.public_id) {
        await cloudinary.uploader.destroy(
          settings.resume.public_id,
          { resource_type: "raw" }
        );
      }

      updateData.resume = {
        url: req.files.resume[0].path,
        public_id: req.files.resume[0].filename,
        originalName: req.files.resume[0].originalname,
      };
    }

    // Create first document
    if (!settings) {
      settings = await Setting.create(updateData);

      return res.status(201).json({
        success: true,
        message: "Portfolio settings created successfully.",
        settings,
      });
    }

    // Update existing document
    settings = await Setting.findByIdAndUpdate(
      settings._id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Portfolio settings updated successfully.",
      settings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
