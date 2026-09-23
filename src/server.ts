import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./database/prisma";
import { apolloServer } from "./graphql/server";
import { graphqlMiddleware } from "./middlewares/graphql.middleware";

/**
 * Application Server
 *
 * Responsible for starting the HTTP server,
 * establishing the database connection and
 * starting the GraphQL server.
 *
 * Application configuration and middleware registration
 * are handled by app.ts.
 */
const startServer = async (): Promise<void> => {
  try {
    /**
     * Connect to the database before accepting requests.
     */
    await prisma.$connect();

    console.log("Database connected successfully.");

    /**
     * Start Apollo GraphQL Server before registering
     * the GraphQL Express middleware.
     */
    await apolloServer.start();

    console.log("GraphQL server started successfully.");

    /**
     * Create the Express application.
     */
    const app = createApp(graphqlMiddleware);

    /**
     * Start the HTTP server.
     */
    app.listen(env.port, () => {
      console.log(
        `Server running on http://localhost:${env.port}`
      );

      console.log(
        `GraphQL endpoint: http://localhost:${env.port}/graphql`
      );

      console.log(`Environment: ${env.nodeEnv}`);
    });
  } catch (error) {
    console.error("Failed to start application:", error);

    /**
     * Exit the process when a required startup dependency
     * cannot be initialized.
     */
    process.exit(1);
  }
};

startServer();