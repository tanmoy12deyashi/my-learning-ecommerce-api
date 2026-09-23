/**
 * Request Body Parsing Middleware
 *
 * Configures Express to parse incoming request bodies.
 *
 * JSON requests are converted into JavaScript objects and made
 * available through `req.body`.
 *
 * Example:
 *
 * POST /api/users
 * Content-Type: application/json
 *
 * {
 *   "name": "John",
 *   "email": "john@example.com"
 * }
 *
 * The parsed data is then available as:
 *
 * req.body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));