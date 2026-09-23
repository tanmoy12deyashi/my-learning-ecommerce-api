import "dotenv/config";

/**
 * Environment Configuration
 *
 * Loads and validates the environment variables required by the
 * application.
 *
 * Keeping environment configuration in one place prevents the
 * rest of the application from accessing process.env directly.
 *
 * If a required environment variable is missing, the application
 * will fail during startup instead of failing later at runtime.
 */

const requiredEnvVariables = [
  "DATABASE_URL",
  "JWT_SECRET",
] as const;

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 3000,

  databaseUrl: process.env.DATABASE_URL!,

  jwtSecret: process.env.JWT_SECRET!,

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",

  maintenanceMode:
    process.env.MAINTENANCE_MODE === "true",
};