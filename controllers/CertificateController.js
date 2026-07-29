const Certificate = require("../models/Certificate");
const cloudinary = require("../config/cloudinary");

// ================================
// Create Certificate
// ================================

const createCertificate = async (req, res) => {
  try {
    const certificateData = {
      ...req.body,
    };

    // Upload Image
    if (req.file) {
      certificateData.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    // Convert skills array
    if (typeof certificateData.skills === "string") {
      certificateData.skills = JSON.parse(certificateData.skills);
    }

    // Convert boolean
    certificateData.featured =
      certificateData.featured === "true";

    // Convert number
    certificateData.order =
      Number(certificateData.order) || 0;

    const certificate =
      await Certificate.create(certificateData);

    res.status(201).json({
      success: true,
      message: "Certificate created successfully.",
      certificate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================================
// Get All Certificates
// ================================

const getAllCertificates = async (req, res) => {
  try {

    const certificates =
      await Certificate.find().sort({
        order: 1,
      });

    res.status(200).json({
      success: true,
      count: certificates.length,
      certificates,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================================
// Get Certificate By ID
// ================================

const getCertificateById = async (req, res) => {
  try {

    const certificate =
      await Certificate.findById(
        req.params.id
      );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }

    res.status(200).json({
      success: true,
      certificate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================================
// Update Certificate
// ================================

const updateCertificate = async (req, res) => {
  try {

    const certificate =
      await Certificate.findById(
        req.params.id
      );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }

    const updateData = {
      ...req.body,
    };

    // Convert skills
    if (typeof updateData.skills === "string") {
      updateData.skills = JSON.parse(
        updateData.skills
      );
    }

    // Convert boolean
    updateData.featured =
      updateData.featured === "true";

    // Convert number
    updateData.order =
      Number(updateData.order) || 0;

    // Upload new image
    if (req.file) {

      // Delete old image
      if (certificate.image?.public_id) {
        await cloudinary.uploader.destroy(
          certificate.image.public_id
        );
      }

      updateData.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };

    }

    const updatedCertificate =
      await Certificate.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Certificate updated successfully.",
      certificate: updatedCertificate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================================
// Delete Certificate
// ================================

const deleteCertificate = async (req, res) => {
  try {

    const certificate =
      await Certificate.findById(
        req.params.id
      );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }

    // Delete Cloudinary image
    if (certificate.image?.public_id) {
      await cloudinary.uploader.destroy(
        certificate.image.public_id
      );
    }

    await certificate.deleteOne();

    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
};