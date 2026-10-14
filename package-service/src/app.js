const express = require("express");
const cors = require("cors");

const packageRoutes = require("./routes/packageRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "TravelMate Package Service",
  });
});

app.use("/api/packages", packageRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;