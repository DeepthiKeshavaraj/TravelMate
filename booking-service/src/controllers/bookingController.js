const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const { getPackageById } = require("../services/packageClient");

// Validate MongoDB document IDs.
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Extract a useful price and available-slot count from the package response.
const getPackageDetails = (travelPackage) => {
  const price = Number(travelPackage.price);
  const availableSlots = Number(travelPackage.availableSlots);

  if (!Number.isFinite(price) || price < 0) {
    const error = new Error("Package has an invalid price");
    error.statusCode = 502;
    throw error;
  }

  return { price, availableSlots };
};

// Create a booking.
const createBooking = async (req, res, next) => {
  try {
    const { packageId, customerName, email, numberOfPeople, travelDate } =
      req.body;

    if (
      !packageId ||
      !customerName ||
      !email ||
      numberOfPeople === undefined ||
      !travelDate
    ) {
      return res.status(400).json({
        success: false,
        message:
          "packageId, customerName, email, numberOfPeople and travelDate are required",
      });
    }

    if (!isValidId(packageId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid package ID",
      });
    }

    const people = Number(numberOfPeople);

    if (!Number.isInteger(people) || people < 1 || people > 20) {
      return res.status(400).json({
        success: false,
        message: "numberOfPeople must be a whole number between 1 and 20",
      });
    }

    const date = new Date(travelDate);

    if (Number.isNaN(date.getTime()) || date <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Travel date must be in the future",
      });
    }

    const travelPackage = await getPackageById(packageId);
    const { price, availableSlots } = getPackageDetails(travelPackage);

    if (
      Number.isFinite(availableSlots) &&
      people > availableSlots
    ) {
      return res.status(400).json({
        success: false,
        message: "Not enough available slots for this package",
      });
    }

    const booking = await Booking.create({
      packageId,
      customerName,
      email,
      numberOfPeople: people,
      travelDate: date,
      totalPrice: price * people,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// List bookings. An email query parameter can limit results.
const getBookings = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.email) {
      filter.email = String(req.query.email).trim().toLowerCase();
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single booking.
const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// Update permitted booking fields and recalculate the price if needed.
const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled bookings cannot be updated",
      });
    }

    const allowedFields = ["customerName", "email", "numberOfPeople", "travelDate"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.numberOfPeople !== undefined) {
      updates.numberOfPeople = Number(updates.numberOfPeople);

      if (
        !Number.isInteger(updates.numberOfPeople) ||
        updates.numberOfPeople < 1 ||
        updates.numberOfPeople > 20
      ) {
        return res.status(400).json({
          success: false,
          message: "numberOfPeople must be a whole number between 1 and 20",
        });
      }
    }

    if (updates.travelDate !== undefined) {
      updates.travelDate = new Date(updates.travelDate);

      if (
        Number.isNaN(updates.travelDate.getTime()) ||
        updates.travelDate <= new Date()
      ) {
        return res.status(400).json({
          success: false,
          message: "Travel date must be in the future",
        });
      }
    }

    if (updates.numberOfPeople !== undefined) {
      const travelPackage = await getPackageById(String(booking.packageId));
      const { price, availableSlots } = getPackageDetails(travelPackage);

      if (
        Number.isFinite(availableSlots) &&
        updates.numberOfPeople > availableSlots
      ) {
        return res.status(400).json({
          success: false,
          message: "Not enough available slots for this package",
        });
      }

      updates.totalPrice = price * updates.numberOfPeople;
    }

    Object.assign(booking, updates);
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel a booking without deleting its record.
const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
};