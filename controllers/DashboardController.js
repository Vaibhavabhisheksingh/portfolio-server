const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const Education = require("../models/Education");
const Certificate = require("../models/Certificate");
const Contact = require("../models/Contact");

const getDashboardStats = async (req, res) => {
    try {

        const totalProjects = await Project.countDocuments();

        const totalSkills = await Skill.countDocuments();

        const totalExperience = await Experience.countDocuments();

        const totalEducation = await Education.countDocuments();

        const totalCertificates = await Certificate.countDocuments();

        const totalMessages = await Contact.countDocuments();

        const unreadMessages = await Contact.countDocuments({
            isRead: false,
        });

        res.status(200).json({
            success: true,
            stats: {
                totalProjects,
                totalSkills,
                totalExperience,
                totalEducation,
                totalCertificates,
                totalMessages,
                unreadMessages,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getRecentMessages = async (req, res) => {
    try {

        const messages = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            messages,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getRecentProjects = async (req, res) => {
    try {

        const projects = await Project.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            projects,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    getDashboardStats,
    getRecentMessages,
    getRecentProjects,
};

