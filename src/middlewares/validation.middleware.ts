import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

/**
 * Request Validation Middleware
 *
 * Validates incoming request data before it reaches the controller.
 *
 * Depending on the route, this can validate:
 * - Request body
 * - Query parameters
 * - Route parameters
 *
 * Validation schemas are normally defined using a validation
 * library such as Zod.
 *
 * Invalid input is rejected early so controllers and services
 * can work with trusted input.
 */
export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success)
      return res.status(400).json({ errors: result.error.flatten() });

    next();
  };