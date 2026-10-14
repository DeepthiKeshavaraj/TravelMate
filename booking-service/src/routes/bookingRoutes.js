const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.patch("/:id/cancel", cancelBooking);

module.exports = router;