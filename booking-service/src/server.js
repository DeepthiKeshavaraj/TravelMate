require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Booking Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Booking Service:", error.message);
    process.exit(1);
  }
};

startServer();