import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Authentication Middleware
 *
 * Verifies the JWT provided by the client and identifies the
 * authenticated user.
 *
 * This middleware should be used on protected routes where a
 * valid login session is required.
 *
 * Request flow:
 * Request → JWT verification → User information → Controller
 *
 * If the token is missing, invalid, or expired, the request is
 * rejected with an authentication error.
 */
export const auth = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};