import timeout from "connect-timeout";

/**
 * Request Timeout Middleware
 *
 * Prevents an HTTP request from running indefinitely.
 *
 * A timeout is useful for protecting the server from requests
 * that become stuck because of slow database queries, external
 * APIs
 * or other long-running operations.
 *
 * When the configured timeout is exceeded, the request is
 * terminated
 * and an appropriate error is returned.
 */
export const requestTimeout = timeout("10s");