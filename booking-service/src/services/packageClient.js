const axios = require("axios");

const PACKAGE_SERVICE_URL = (
  process.env.PACKAGE_SERVICE_URL || "http://localhost:5001"
).replace(/\/+$/, "");

/**
 * Fetch a travel package by ID from the Package Service.
 * @param {string} id - Package MongoDB ObjectId string
 * @returns {Promise<Object>} Package data
 */
const getPackageById = async (id) => {
  try {
    const response = await axios.get(`${PACKAGE_SERVICE_URL}/api/packages/${id}`, {
      timeout: 5000,
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const notFoundError = new Error("Travel package not found");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }
    const serviceError = new Error("Failed to communicate with Package Service");
    serviceError.statusCode = 502;
    throw serviceError;
  }
};

module.exports = { getPackageById };
