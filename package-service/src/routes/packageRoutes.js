const express = require("express");
const router = express.Router();

const {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

router.route("/")
  .post(createPackage)
  .get(getPackages);

router.route("/:id")
  .get(getPackageById)
  .put(updatePackage)
  .delete(deletePackage);

module.exports = router;