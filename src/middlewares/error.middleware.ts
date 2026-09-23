import { Request, Response, NextFunction } from "express";

/**
 * Global Error Handling Middleware
 *
 * Handles errors thrown anywhere in the request lifecycle and
 * converts them into a consistent HTTP response.
 *
 * Instead of handling errors separately in every controller,
 * application errors are passed to this middleware.
 *
 * This middleware should be registered after all routes and
 * other middleware.
 *
 * Request flow:
 * Controller/Service → Error → Error Handler → HTTP Response
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};