import axios from "axios";

/**
 * Shared Axios instance for all API requests
 * - Uses Next.js API routes (/api)
 * - Sends cookies for session authentication
 * - Centralizes error handling via interceptors
 */
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;