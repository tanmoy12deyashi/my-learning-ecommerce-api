import { Response, NextFunction } from "express";

/**
 * Authorization Middleware
 *
 * Controls access to protected resources based on the user's
 * role or permissions.
 *
 * Authentication answers:
 * "Who is the user?"
 *
 * Authorization answers:
 * "Is this user allowed to perform this action?"
 *
 * This middleware is normally used after auth.middleware.ts.
 *
 * Example:
 * authMiddleware → authorize("ADMIN") → Controller
 */
export const authorize = (...roles: string[]) =>
  (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role))
      return res.status(403).json({ message: "Forbidden" });

    next();
  };