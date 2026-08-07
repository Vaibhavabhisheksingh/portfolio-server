const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const hpp = require("hpp");

const connectDB = require("./config/db");

const {
  apiLimiter,
  contactLimiter,
  loginLimiter,
} = require("./middleware/rateLimiter");

dotenv.config();

connectDB();

const app = express();

/* ---------------- Security ---------------- */

app.set("trust proxy", 1);

app.disable("x-powered-by");

app.use(helmet());

app.use(compression());

app.use(hpp());


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

/* ---------------- Middlewares ---------------- */

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// General API Rate Limiter
app.use("/api", apiLimiter);

/* ---------------- Health Check ---------------- */

app.get("/", (req, res) => {
  res.send("Portfolio API Running...");
});

/* ---------------- Routes ---------------- */

const authRoutes = require("./routes/AuthRoutes");
const projectRoutes = require("./routes/ProjectRoutes");
const skillRoutes = require("./routes/SkillRoutes");
const experienceRoutes = require("./routes/ExperienceRoutes");
const educationRoutes = require("./routes/EducationRoutes");
const certificateRoutes = require("./routes/CertificateRoutes");
const socialRoutes = require("./routes/SocialRoutes");
const settingRoutes = require("./routes/SettingRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const dashboardRoutes = require("./routes/DashboardRoutes");
const uploadRoutes = require("./routes/UploadRoutes");

// Authentication
app.use("/api/auth", loginLimiter, authRoutes);

// Public APIs
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/socials", socialRoutes);
app.use("/api/settings", settingRoutes);

// Contact Form
app.use("/api/contact", contactRoutes);

// Admin APIs
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);

/* ---------------- Server ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
