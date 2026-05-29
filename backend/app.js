const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const adminRoutes = require("./src/routes/admin.routes");
const userRoutes = require("./src/routes/user.routes");
const app = express();

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const developmentOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];

const appOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_APP_URL].filter(Boolean);
const allowedOrigins = [...new Set([...configuredOrigins, ...appOrigins, ...developmentOrigins])];
const isLocalDevelopmentOrigin = (origin = "") =>
  /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || isLocalDevelopmentOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "IJHAT Backend Running Successfully",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "IJHAT Backend Running Successfully",
  });
});

app.get("/health-check", (req, res) => {
  res.json({
    success: true,
    message: "IJHAT Backend Running Successfully",
  });
});

app.use("/api/auth", authRoutes);

// Admin Login API
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contact", require("./src/routes/contact.routes"));
app.use("/api/newsletter", require("./src/routes/newsletter.routes"));
// Manuscript APIs
app.use("/api/manuscript", require("./src/routes/manuscript.routes"));

// Uploaded files
app.use("/uploads", express.static("uploads"));

module.exports = app;
