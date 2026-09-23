/**
 * User Controller
 *
 * Handles HTTP requests related to users.
 *
 * Controllers are responsible for:
 * - Reading request data
 * - Calling the service layer
 * - Returning HTTP responses
 */

import { Request, Response } from "express";

import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "./user.service";

/**
 * GET /api/users
 *
 * Returns a list of users.
 */
export const getUsers = async (
  _req: Request,
  res: Response,
) => {
  // Get users through the service layer.
  const users = await getAllUsers();

  // Return the users to the client.
  res.status(200).json({
    success: true,
    data: users,
  });
};

/**
 * GET /api/users/:id
 *
 * Returns a single user.
 */
export const getUser = async (
  req: Request,
  res: Response,
) => {
  // The user ID comes from the URL parameter.
  const { id } = req.params;

  // Get the user through the service layer.
  const user = await getUserById(id);

  // Return the user.
  res.status(200).json({
    success: true,
    data: user,
  });
};

/**
 * POST /api/users
 *
 * Creates a new user.
 */
export const createUser = async (
  req: Request,
  res: Response,
) => {
  // Request body has already been validated
  // by the validation middleware.
  const user = await createNewUser(req.body);

  // Return the newly created user.
  res.status(201).json({
    success: true,
    data: user,
  });
};

/**
 * PATCH /api/users/:id
 *
 * Updates an existing user.
 */
export const updateUser = async (
  req: Request,
  res: Response,
) => {
  // Read the user ID from the URL.
  const { id } = req.params;

  // Update the user through the service layer.
  const user = await updateUserById(
    id,
    req.body,
  );

  // Return the updated user.
  res.status(200).json({
    success: true,
    data: user,
  });
};

/**
 * DELETE /api/users/:id
 *
 * Deletes an existing user.
 */
export const removeUser = async (
  req: Request,
  res: Response,
) => {
  // Read the user ID from the URL.
  const { id } = req.params;

  // Delete the user through the service layer.
  const result = await deleteUserById(id);

  // Return the deletion result.
  res.status(200).json({
    success: true,
    data: result,
  });
};