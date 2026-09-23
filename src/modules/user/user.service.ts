/**
 * User Service
 *
 * Contains business logic related to users.
 *
 * The service sits between the controller and repository.
 */

import bcrypt from "bcrypt";

import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  updateUser,
} from "./user.repository";

import {
  CreateUserInput,
  UpdateUserInput,
} from "./user.types";

/**
 * Number of bcrypt salt rounds used when hashing passwords.
 *
 * Higher values increase password hashing cost.
 */
const BCRYPT_SALT_ROUNDS = 12;

/**
 * Get all users.
 */
export const getAllUsers = async () => {
  return findAllUsers();
};

/**
 * Get a user by ID.
 */
export const getUserById = async (id: string) => {
  // Look up the user in the database.
  const user = await findUserById(id);

  // Return a clear error when the user does not exist.
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Create a new user.
 *
 * This method is mainly included for the current User module.
 * Later, registration can be moved to the Auth module.
 */
export const createNewUser = async (
  input: CreateUserInput,
) => {
  // Normalize the email before using it.
  const email = input.email.toLowerCase().trim();

  // Check whether another user already uses this email.
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // Hash the plain-text password before storing it.
  const passwordHash = await bcrypt.hash(
    input.password,
    BCRYPT_SALT_ROUNDS,
  );

  // Create the user with the hashed password.
  return createUser({
    name: input.name,
    email,
    passwordHash,
    role: input.role,
  });
};

/**
 * Update an existing user.
 */
export const updateUserById = async (
  id: string,
  input: UpdateUserInput,
) => {
  // First make sure the user exists.
  const existingUser = await findUserById(id);

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Build the update object dynamically.
  const updateData: Record<string, unknown> = {};

  // Update name when it is provided.
  if (input.name !== undefined) {
    updateData.name = input.name;
  }

  // Update email when it is provided.
  if (input.email !== undefined) {
    const email = input.email.toLowerCase().trim();

    // Check whether another user already owns this email.
    const existingEmailUser = await findUserByEmail(email);

    if (
      existingEmailUser &&
      existingEmailUser.id !== id
    ) {
      throw new Error("Email is already registered");
    }

    updateData.email = email;
  }

  // Hash the password before updating it.
  if (input.password !== undefined) {
    updateData.passwordHash = await bcrypt.hash(
      input.password,
      BCRYPT_SALT_ROUNDS,
    );
  }

  // Update role when supplied.
  if (input.role !== undefined) {
    updateData.role = input.role;
  }

  // Update account status when supplied.
  if (input.isActive !== undefined) {
    updateData.isActive = input.isActive;
  }

  // Send the final update data to the repository.
  return updateUser(id, updateData);
};

/**
 * Delete a user.
 */
export const deleteUserById = async (id: string) => {
  // Check that the user exists first.
  const existingUser = await findUserById(id);

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Delete the user from the database.
  await deleteUser(id);

  return {
    message: "User deleted successfully",
  };
};