const Social = require("../models/Social");

// Create Social
const createSocial = async (req, res) => {
  try {
    const socialData = {
      ...req.body,
    };

    const exists = await Social.findOne({
      platform: socialData.platform,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Platform already exists.",
      });
    }

    socialData.featured =
      socialData.featured === true || socialData.featured === "true";

    socialData.order = Number(socialData.order);

    const social = await Social.create(socialData);

    res.status(201).json({
      success: true,
      message: "Social link created successfully.",
      social,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Social Links
const getAllSocials = async (req, res) => {
  try {
    const socials = await Social.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: socials.length,
      socials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Social By ID
const getSocialById = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id);

    if (!social) {
      return res.status(404).json({
        success: false,
        message: "Social link not found.",
      });
    }

    res.status(200).json({
      success: true,
      social,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Social
const updateSocial = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id);

    if (!social) {
      return res.status(404).json({
        success: false,
        message: "Social link not found.",
      });
    }

    const updateData = {
      ...req.body,
    };

    updateData.featured =
      updateData.featured === true || updateData.featured === "true";
    updateData.order = Number(updateData.order);

    const updatedSocial = await Social.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    // if (!updatedSocial) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Social link not found.",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Social link updated successfully.",
      social: updatedSocial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Social
const deleteSocial = async (req, res) => {
  try {
    const social = await Social.findByIdAndDelete(req.params.id);

    if (!social) {
      return res.status(404).json({
        success: false,
        message: "Social link not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Social link deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSocial,
  getAllSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
};
