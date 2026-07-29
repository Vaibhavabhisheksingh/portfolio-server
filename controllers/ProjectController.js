const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

const createProject = async (req, res) => {
  try {
    const projectData = {
      ...req.body,
    };

    // Save uploaded image
    if (req.file) {
      projectData.images = [
        {
          url: req.file.path,
          public_id: req.file.filename,
        },
      ];
    }

    // Convert techStack if sent as JSON string
    if (typeof projectData.techStack === "string") {
      projectData.techStack = JSON.parse(projectData.techStack);
    }

    projectData.featured = projectData.featured === "true";

    projectData.order = Number(projectData.order);

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all projects api

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get single project api

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update project api

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    const updateData = {
      ...req.body,
    };

    // Convert techStack if needed
    if (typeof updateData.techStack === "string") {
      updateData.techStack = JSON.parse(updateData.techStack);
    }
    updateData.featured = updateData.featured === "true";

    updateData.order = Number(updateData.order);

    if (req.file) {
      // Delete old image
      if (project.images?.length) {
        for (const image of project.images) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }

      updateData.images = [
        {
          url: req.file.path,
          public_id: req.file.filename,
        },
      ];
    }

    // const updatedProject = await Project.findByIdAndUpdate(
    //   req.params.id,
    //   updateData,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete project api

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // Delete the image from Cloudinary
    if (project.images && project.images.length > 0) {
      for (const image of project.images) {
        if (image.public_id) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
