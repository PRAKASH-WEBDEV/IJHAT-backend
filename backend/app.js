const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const adminRoutes = require("./src/routes/admin.routes");
const userRoutes = require("./src/routes/user.routes");
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ijahtjournal.com",
  "https://www.ijahtjournal.com",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
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
