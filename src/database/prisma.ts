import { PrismaClient } from "@prisma/client";

/**
 * Prisma Database Client
 *
 * Creates a single Prisma Client instance that is shared
 * throughout the application.
 *
 * The Prisma Client is responsible for communicating with
 * the PostgreSQL database and executing database queries.
 *
 * Reusing a single instance prevents the application from
 * creating unnecessary database connections.
 */

export const prisma = new PrismaClient();