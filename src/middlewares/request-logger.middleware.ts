/**
 * Request Logger Middleware
 *
 * Logs information about incoming HTTP requests and their
 * corresponding responses.
 *
 * Typical information includes:
 * - HTTP method
 * - Request URL
 * - Response status
 * - Request duration
 * - Request ID
 *
 * This is useful for debugging, monitoring and troubleshooting
 * issues in development and production.
 */
export const logger = (req: any, res: any, next: any) => {
  const start = Date.now();

  res.on("finish", () => {
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`
    );
  });

  next();
};