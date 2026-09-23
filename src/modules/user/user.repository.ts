/**
 * User Repository
 *
 * Responsible only for database operations
 * related to the User model.
 */

import { Prisma } from "../../generated/prisma/client";

import { prisma } from "../../database/prisma";

/**
 * Get all users.
 *
 * Password hashes are intentionally excluded
 * from the returned data.
 */
export const findAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },

    // Show the newest users first.
    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Find a user by their unique ID.
 */
export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },

    // Never return the password hash
    // for normal user queries.
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

/**
 * Find a user by email address.
 *
 * This method includes passwordHash because
 * authentication will need it when checking login credentials.
 */
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },

    select: {
      id: true,
      name: true,
      email: true,
      passwordHash: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

/**
 * Create a new user.
 */
export const createUser = async (
  data: Prisma.UserCreateInput,
) => {
  return prisma.user.create({
    data,

    // Do not return passwordHash after creation.
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

/**
 * Update an existing user.
 */
export const updateUser = async (
  id: string,
  data: Prisma.UserUpdateInput,
) => {
  return prisma.user.update({
    where: {
      id,
    },

    data,

    // Do not expose the password hash.
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

/**
 * Delete a user by ID.
 */
export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};