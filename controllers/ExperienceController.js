const Experience = require("../models/Experience");
const cloudinary = require("../config/cloudinary");

const createExperience = async (req, res) => {
  try {
    const experienceData = {
      ...req.body,
    };

    if (req.file) {
      experienceData.companyLogo = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    if (typeof experienceData.description === "string") {
      experienceData.description = JSON.parse(
        experienceData.description
      );
    }

    if (typeof experienceData.technologies === "string") {
      experienceData.technologies = JSON.parse(
        experienceData.technologies
      );
    }

    experienceData.currentlyWorking =
      experienceData.currentlyWorking === "true";

    experienceData.order = Number(
      experienceData.order
    );

    if (experienceData.currentlyWorking) {
      experienceData.endDate = null;
    }

    const experience = await Experience.create(
      experienceData
    );

    res.status(201).json({
      success: true,
      message: "Experience created successfully.",
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Experiences
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Experience By ID
const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    res.status(200).json({
      success: true,
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Experience
// const updateExperience = async (req, res) => {
//   try {
//     const experience = await Experience.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       },
//     );

//     if (!experience) {
//       return res.status(404).json({
//         success: false,
//         message: "Experience not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Experience updated successfully.",
//       experience,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const updateExperience = async (req, res) => {
  try {
    const experience =
      await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    const updateData = {
      ...req.body,
    };

    if (typeof updateData.description === "string") {
      updateData.description = JSON.parse(
        updateData.description
      );
    }

    if (typeof updateData.technologies === "string") {
      updateData.technologies = JSON.parse(
        updateData.technologies
      );
    }

    updateData.currentlyWorking =
      updateData.currentlyWorking === "true";

    updateData.order = Number(
      updateData.order
    );

    if (updateData.currentlyWorking) {
      updateData.endDate = null;
    }

    if (req.file) {
      if (
        experience.companyLogo?.public_id
      ) {
        await cloudinary.uploader.destroy(
          experience.companyLogo.public_id
        );
      }

      updateData.companyLogo = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedExperience =
      await Experience.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Experience updated successfully.",
      experience: updatedExperience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Experience
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    // if (experience.images && experience.images.length > 0) {

    //     for (const image of experience.images) {

    //         if (image.public_id) {
    //             await cloudinary.uploader.destroy(image.public_id);
    //         }

    //     }

    // }
    if (experience.companyLogo?.public_id) {
      await cloudinary.uploader.destroy(experience.companyLogo.public_id);
    }
    await experience.deleteOne();

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
