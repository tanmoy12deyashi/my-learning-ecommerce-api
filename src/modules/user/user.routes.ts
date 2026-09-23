/**
 * User Routes
 *
 * Defines REST API endpoints related to users.
 */

import { Router } from "express";

import {
  createUser,
  getUser,
  getUsers,
  removeUser,
  updateUser,
} from "./user.controller";

import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from "./user.validation";

import { validate } from "../../middlewares/validation.middleware";

const router = Router();

/**
 * Create a new user.
 *
 * POST /api/users
 */
router.post(
  "/",
  validate(createUserSchema),
  createUser,
);

/**
 * Get all users.
 *
 * GET /api/users
 */
router.get(
  "/",
  getUsers,
);

/**
 * Get a single user.
 *
 * GET /api/users/:id
 */
router.get(
  "/:id",
  validate(userIdParamSchema, "params"),
  getUser,
);

/**
 * Update an existing user.
 *
 * PATCH /api/users/:id
 */
router.patch(
  "/:id",
  validate(userIdParamSchema, "params"),
  validate(updateUserSchema),
  updateUser,
);

/**
 * Delete an existing user.
 *
 * DELETE /api/users/:id
 */
router.delete(
  "/:id",
  validate(userIdParamSchema, "params"),
  removeUser,
);

export default router;