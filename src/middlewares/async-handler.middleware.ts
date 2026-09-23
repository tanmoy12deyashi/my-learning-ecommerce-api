import { RequestHandler } from "express";

/**
 * Async Handler Utility
 *
 * Wraps asynchronous Express route handlers and forwards rejected
 * promises to the application's global error handler.
 *
 * This avoids repeating try/catch blocks inside every controller.
 *
 * Without this wrapper:
 *
 * Controller → try/catch → Error Handler
 *
 * With this wrapper:
 *
 * Controller → Async Handler → Error Handler
 */
export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);