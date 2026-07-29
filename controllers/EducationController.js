const Education = require("../models/Education");
const cloudinary = require("../config/cloudinary");

// Create
const createEducation = async (req, res) => {
  try {
    const educationData = {
      ...req.body,
    };

    if (req.file) {
      educationData.institutionLogo = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    if (typeof educationData.description === "string") {
      educationData.description = JSON.parse(educationData.description);
    }

    educationData.currentlyStudying =
      educationData.currentlyStudying === "true";

    educationData.order = Number(educationData.order);

    if (educationData.currentlyStudying) {
      educationData.endDate = null;
    }

    const education = await Education.create(educationData);

    res.status(201).json({
      success: true,
      message: "Education created successfully.",
      education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
const getAllEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: educations.length,
      educations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get One
const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
const updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    const updateData = {
      ...req.body,
    };

    // Convert description array
    if (typeof updateData.description === "string") {
      updateData.description = JSON.parse(updateData.description);
    }

    // Boolean conversion
    updateData.currentlyStudying =
      updateData.currentlyStudying === "true";

    // Number conversion
    updateData.order = Number(updateData.order);

    // Remove end date if currently studying
    if (updateData.currentlyStudying) {
      updateData.endDate = null;
    }

    // Handle institution logo update
    if (req.file) {
      // Delete old logo from Cloudinary
      if (education.institutionLogo?.public_id) {
        await cloudinary.uploader.destroy(
          education.institutionLogo.public_id
        );
      }

      updateData.institutionLogo = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        returnDocument: "after", // or new: true
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Education updated successfully.",
      education: updatedEducation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    if (education.institutionLogo?.public_id) {
      await cloudinary.uploader.destroy(education.institutionLogo.public_id);
    }

    await education.deleteOne();

    res.status(200).json({
      success: true,
      message: "Education deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEducation,
  getAllEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
};
