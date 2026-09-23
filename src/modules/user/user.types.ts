/**
 * User Module Types
 *
 * Contains TypeScript types and interfaces
 * used by the User module.
 */

import { UserRole } from "../../generated/prisma/client";

/**
 * Input required to create a new user.
 *
 * The password is received as plain text from the API
 * and will be hashed inside the service before storage.
 */
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

/**
 * Input allowed when updating a user.
 *
 * All properties are optional because the API uses PATCH.
 */
export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
}

/**
 * Route parameters used when accessing a specific user.
 *
 * Example:
 * GET /api/users/:id
 */
export interface UserIdParams {
  id: string;
}