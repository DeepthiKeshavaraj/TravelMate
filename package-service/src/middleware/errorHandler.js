const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid package data",
    });
  }

  if (err.name === "StrictModeError") {
    return res.status(400).json({
      message: "Unknown field provided",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: "A package with this unique value already exists",
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message,
  });
};

module.exports = errorHandler;