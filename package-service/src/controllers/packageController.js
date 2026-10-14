const TravelPackage = require("../models/TravelPackage");

// Create a new travel package
const createPackage = async (req, res, next) => {
  try {
    const newPackage = await TravelPackage.create(req.body);

    res.status(201).json({
      message: "Travel package created successfully",
      data: newPackage,
    });
  } catch (error) {
    next(error);
  }
};

// Get all travel packages
const getPackages = async (req, res, next) => {
  try {
    const packages = await TravelPackage.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    next(error);
  }
};

// Get one travel package by ID
const getPackageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({
        message: "Invalid package ID",
      });
    }

    const travelPackage = await TravelPackage.findById(id);

    if (!travelPackage) {
      return res.status(404).json({
        message: "Travel package not found",
      });
    }

    res.status(200).json({ data: travelPackage });
  } catch (error) {
    next(error);
  }
};

// Update a travel package
const updatePackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({
        message: "Invalid package ID",
      });
    }

    const updatedPackage = await TravelPackage.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
        strict: "throw",
      }
    );

    if (!updatedPackage) {
      return res.status(404).json({
        message: "Travel package not found",
      });
    }

    res.status(200).json({
      message: "Travel package updated successfully",
      data: updatedPackage,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a travel package
const deletePackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({
        message: "Invalid package ID",
      });
    }

    const deletedPackage = await TravelPackage.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({
        message: "Travel package not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};