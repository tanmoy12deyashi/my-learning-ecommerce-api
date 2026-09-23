import { randomUUID } from "crypto";

/**
 * Request ID Middleware
 *
 * Generates a unique identifier for each incoming HTTP request.
 *
 * The request ID can be attached to the request object and/or
 * returned through the response headers.
 *
 * It is mainly used for tracing and debugging requests across
 * application logs and external services.
 *
 * Example:
 * Request → Request ID → Logger → Controller
 */
export const requestIdMiddleware = (req: any, res: any, next: any) => {
  const id = randomUUID();

  req.requestId = id;
  res.setHeader("X-Request-ID", id);

  next();
};