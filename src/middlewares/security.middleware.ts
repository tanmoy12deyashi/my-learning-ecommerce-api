import helmet from "helmet";

/**
 * Security Middleware
 *
 * Applies HTTP security-related headers to Express responses.
 *
 * This middleware is typically implemented using Helmet and
 * helps reduce exposure to common web security issues.
 *
 * It should normally be registered near the beginning of the
 * application middleware chain.
 */
export const security = helmet();