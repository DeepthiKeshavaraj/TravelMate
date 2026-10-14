const express = require("express");
const cors = require("cors");

const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Parse incoming JSON requests.
app.use(express.json());

// Allow requests from the configured frontend.
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

// Health check endpoint.
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "booking-service",
    message: "Booking Service is running",
  });
});

// Booking API routes.
app.use("/api/bookings", bookingRoutes);

// Handle unknown routes.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error-handling middleware must be registered last.
app.use(errorHandler);

module.exports = app;