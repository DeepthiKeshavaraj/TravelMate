const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Package ID is required"],
      index: true,
    },

    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      minlength: [2, "Customer name must be at least 2 characters"],
      maxlength: [100, "Customer name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    numberOfPeople: {
      type: Number,
      required: [true, "Number of people is required"],
      min: [1, "At least one person is required"],
      max: [20, "A maximum of 20 people is allowed"],
      validate: {
        validator: Number.isInteger,
        message: "Number of people must be a whole number",
      },
    },

    travelDate: {
      type: Date,
      required: [true, "Travel date is required"],
      validate: {
        validator: (value) => value > new Date(),
        message: "Travel date must be in the future",
      },
    },

    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price cannot be negative"],
    },

    status: {
      type: String,
      enum: {
        values: ["confirmed", "cancelled"],
        message: "Status must be confirmed or cancelled",
      },
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);