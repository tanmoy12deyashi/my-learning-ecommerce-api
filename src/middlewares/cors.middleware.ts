import cors from "cors";

/**
 * CORS Middleware
 *
 * Controls which external origins are allowed to access the API
 * from a browser.
 *
 * CORS configuration can define:
 * - Allowed origins
 * - HTTP methods
 * - Request headers
 * - Credentials
 *
 * This middleware is especially important when the frontend
 * and backend are hosted on different domains.
 */
export const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
});