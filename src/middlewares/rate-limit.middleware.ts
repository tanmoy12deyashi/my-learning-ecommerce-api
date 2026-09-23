import rateLimit from "express-rate-limit";

/**
 * Rate Limit Middleware
 *
 * Limits the number of requests a client can make within a
 * defined period of time.
 *
 * This helps protect the API from excessive traffic, accidental
 * request loops and certain types of abuse.
 *
 * Rate limits can be configured globally or applied only to
 * specific endpoints such as login or password reset routes.
 */
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100
});