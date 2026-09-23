import { Request, Response } from "express";

/**
 * Not Found Middleware
 *
 * Handles requests that do not match any registered API route.
 *
 * It runs after all application routes have been registered.
 *
 * Example:
 * GET /api/unknown
 *        ↓
 * No matching route
 *        ↓
 * Not Found Middleware
 *        ↓
 * 404 Response
 */
export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
};