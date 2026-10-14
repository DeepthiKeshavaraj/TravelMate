const BOOKING_BASE_URL =
  import.meta.env.VITE_BOOKING_SERVICE_URL || "http://localhost:5002";

/**
 * Handle API response and extract JSON or error message
 */
async function handleResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const errorMsg =
      data?.message || `HTTP Error ${response.status}: ${response.statusText}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Fetch health status of the Booking Service
 */
export async function checkBookingServiceHealth() {
  try {
    const res = await fetch(`${BOOKING_BASE_URL}/health`);
    return await handleResponse(res);
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Create a new booking
 * Backend contract:
 * POST /api/bookings
 * Body: { packageId, customerName, email, numberOfPeople, travelDate }
 * Returns: { success: true, message: string, data: Booking }
 */
export async function createBooking({
  packageId,
  customerName,
  email,
  numberOfPeople,
  travelDate,
}) {
  const payload = {
    packageId,
    customerName: customerName?.trim(),
    email: email?.trim().toLowerCase(),
    numberOfPeople: Number(numberOfPeople),
    travelDate,
  };

  const res = await fetch(`${BOOKING_BASE_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

/**
 * List bookings. Can optionally filter by customer email.
 * Backend contract: GET /api/bookings?email=...
 * Returns: { success: true, count: number, data: Booking[] }
 */
export async function getBookings(email = "") {
  let url = `${BOOKING_BASE_URL}/api/bookings`;
  if (email && email.trim()) {
    url += `?email=${encodeURIComponent(email.trim().toLowerCase())}`;
  }

  const res = await fetch(url);
  const json = await handleResponse(res);
  return Array.isArray(json?.data) ? json.data : [];
}

/**
 * Get a single booking by ID
 * Backend contract: GET /api/bookings/:id
 * Returns: { success: true, data: Booking }
 */
export async function getBookingById(id) {
  if (!id) throw new Error("Booking ID is required");
  const res = await fetch(`${BOOKING_BASE_URL}/api/bookings/${id}`);
  const json = await handleResponse(res);
  return json?.data || null;
}

/**
 * Cancel a booking without deleting record
 * Backend contract: PATCH /api/bookings/:id/cancel
 * Returns: { success: true, message: string, data: Booking }
 */
export async function cancelBooking(id) {
  if (!id) throw new Error("Booking ID is required");
  const res = await fetch(`${BOOKING_BASE_URL}/api/bookings/${id}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(res);
}
