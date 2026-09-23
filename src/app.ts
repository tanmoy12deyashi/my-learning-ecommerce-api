import express, { Application } from "express";

import { corsMiddleware } from "./middlewares/cors.middleware";
import { securityMiddleware } from "./middlewares/security.middleware";
import { requestIdMiddleware } from "./middlewares/request-id.middleware";
import { requestLoggerMiddleware } from "./middlewares/request-logger.middleware";
import { rateLimitMiddleware } from "./middlewares/rate-limit.middleware";
import { maintenanceMiddleware } from "./middlewares/maintenance.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

import routes from "./routes";

/**
 * Express Application
 *
 * Creates and configures the Express application.
 *
 * This file is responsible for registering application-level
 * middleware, API routes and global error handling.
 *
 * The HTTP server is intentionally not started here.
 * Starting the server is handled by server.ts.
 */

const app: Application = express();

/**
 * Security
 *
 * Adds security-related HTTP headers to application responses.
 */
app.use(securityMiddleware);

/**
 * CORS
 *
 * Controls which external origins are allowed to access
 * the API from a browser.
 */
app.use(corsMiddleware);

/**
 * Request ID
 *
 * Generates a unique ID for every incoming request.
 * The ID can be used to trace requests through application logs.
 */
app.use(requestIdMiddleware);

/**
 * Request Logger
 *
 * Logs incoming requests, response status codes and
 * request processing time.
 */
app.use(requestLoggerMiddleware);

/**
 * Body Parser
 *
 * Parses incoming JSON request bodies and makes the data
 * available through req.body.
 */
app.use(express.json());

/**
 * Rate Limiting
 *
 * Protects the API from excessive requests.
 */
app.use(rateLimitMiddleware);

/**
 * Maintenance Mode
 *
 * Blocks normal API requests when maintenance mode is enabled.
 */
app.use(maintenanceMiddleware);

/**
 * API Routes
 *
 * All application routes are registered from the central
 * route registry.
 */
app.use("/api", routes);

/**
 * 404 Handler
 *
 * Handles requests for routes that do not exist.
 *
 * This must be registered after all application routes.
 */
app.use(notFoundMiddleware);

/**
 * Global Error Handler
 *
 * Handles errors passed through next(error) or thrown by
 * asynchronous request handlers.
 *
 * This must always be the last middleware.
 */
app.use(errorMiddleware);

export default app;