const PACKAGE_BASE_URL =
  import.meta.env.VITE_PACKAGE_SERVICE_URL || "http://localhost:5001";

/**
 * Handle API response and extract JSON or error message
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errData = await response.json();
      if (errData && errData.message) {
        errorMessage = errData.message;
      }
    } catch {
      // Body was not JSON
    }
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/**
 * Fetch health status of the Package Service
 */
export async function checkPackageServiceHealth() {
  try {
    const res = await fetch(`${PACKAGE_BASE_URL}/health`);
    return await handleResponse(res);
  } catch (error) {
    return { status: "unreachable", error: error.message };
  }
}

/**
 * Fetch all travel packages
 * Backend contract: GET /api/packages -> { count: number, data: [...] }
 */
export async function getAllPackages() {
  try {
    const res = await fetch(`${PACKAGE_BASE_URL}/api/packages`);
    const json = await handleResponse(res);
    return Array.isArray(json?.data) ? json.data : [];
  } catch (error) {
    console.error("Failed to fetch packages:", error);
    throw error;
  }
}

/**
 * Fetch a single package by its ID
 * Backend contract: GET /api/packages/:id -> { data: { ... } }
 */
export async function getPackageById(id) {
  if (!id) {
    throw new Error("Package ID is required");
  }
  try {
    const res = await fetch(`${PACKAGE_BASE_URL}/api/packages/${id}`);
    const json = await handleResponse(res);
    return json?.data || null;
  } catch (error) {
    console.error(`Failed to fetch package ${id}:`, error);
    throw error;
  }
}
