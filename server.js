/**
 * Weito Ventures Backend Server
 *
 * This is a lightweight Node.js + Express backend prepared for deployment.
 * Currently handles basic routing and will integrate with:
 * - Contact form submissions (future: email service integration)
 * - Database operations (future: user profiles, loan applications)
 * - Authentication (future: JWT-based user auth)
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const contactRoutes = require("./routes/contact");

// Route middleware
app.use("/api/contact", contactRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

// Connect to MongoDB if URI provided
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      // Start server anyway so non-db routes remain available
      app.listen(PORT, () => {
        console.log(`Server is running (no DB) on http://localhost:${PORT}`);
      });
    });
} else {
  console.warn("MONGODB_URI not set. Starting server without DB connection.");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}
