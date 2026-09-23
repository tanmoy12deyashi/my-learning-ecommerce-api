import { Request, Response, NextFunction } from "express";

/**
 * Maintenance Mode Middleware
 *
 * Temporarily blocks access to the application while the system
 * is under maintenance.
 *
 * Maintenance mode is controlled through the MAINTENANCE_MODE
 * environment variable.
 *
 * When maintenance mode is enabled, normal API requests return
 * a 503 Service Unavailable response.
 *
 * Health-check and monitoring endpoints can be excluded so that
 * the application can still be monitored during maintenance.
 */
export const maintenanceMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

  // Allow health checks while the application is in maintenance.
  if (req.path === "/health") {
    next();
    return;
  }

  if (maintenanceMode) {
    res.status(503).json({
      success: false,
      message: "Service is temporarily unavailable due to maintenance.",
    });

    return;
  }

  next();
};