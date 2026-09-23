/**
 * User Validation
 *
 * Contains Zod schemas used to validate
 * incoming User API requests.
 */

import { z } from "zod";

/**
 * Validation schema for creating a user.
 */
export const createUserSchema = z.object({
  // User's name.
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(255, "Name cannot exceed 255 characters"),

  // User's email address.
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email cannot exceed 255 characters"),

  // Plain password received from the client.
  // It will be hashed before being stored.
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),

  // Role is optional.
  // In the public registration flow, we should eventually
  // force this to CUSTOMER instead of accepting ADMIN.
  role: z
    .enum(["ADMIN", "CUSTOMER"])
    .optional(),
});

/**
 * Validation schema for updating a user.
 *
 * All fields are optional because PATCH allows
 * partial updates.
 */
export const updateUserSchema = z.object({
  // Updated user name.
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(255, "Name cannot exceed 255 characters")
    .optional(),

  // Updated email address.
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email cannot exceed 255 characters")
    .optional(),

  // New password.
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(100, "Password cannot exceed 100 characters")
    .optional(),

  // User role.
  role: z
    .enum(["ADMIN", "CUSTOMER"])
    .optional(),

  // Account active/inactive status.
  isActive: z
    .boolean()
    .optional(),
});

/**
 * Validation schema for user ID route parameters.
 *
 * Example:
 * GET /api/users/550e8400-e29b-41d4-a716-446655440000
 */
export const userIdParamSchema = z.object({
  id: z.string().uuid("Invalid user ID"),
});