import app from "./app";
import { env } from "./config/env";
import { prisma } from "./database/prisma";

/**
 * Application Server
 *
 * Responsible for starting the HTTP server and establishing
 * the application's database connection.
 *
 * Application configuration and middleware registration are
 * handled by app.ts.
 *
 * Keeping server startup separate from the Express application
 * makes the application easier to test and maintain.
 */

const startServer = async (): Promise<void> => {
  try {
    /**
     * Connect to the database before accepting requests.
     *
     * This prevents the application from starting successfully
     * while the database is unavailable.
     */
    await prisma.$connect();

    console.log("Database connected successfully.");

    /**
     * Start the HTTP server.
     */
    app.listen(env.port, () => {
      console.log(
        `Server running on http://localhost:${env.port}`
      );

      console.log(`Environment: ${env.nodeEnv}`);
    });
  } catch (error) {
    console.error("Failed to start application:", error);

    /**
     * Exit the process when the application cannot establish
     * its required startup dependencies.
     */
    process.exit(1);
  }
};

startServer();