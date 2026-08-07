require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const seedAdmin = async () => {
  try {
    // Connect Database
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit();
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash("xyz", 10);

    // Create Admin
    await Admin.create({
      name: "xyz",
      email: "xyz@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully.");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();