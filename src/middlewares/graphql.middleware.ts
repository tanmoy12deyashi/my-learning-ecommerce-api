import { expressMiddleware } from "@as-integrations/express5";

import { apolloServer } from "../graphql/server";

/**
 * GraphQL Middleware
 *
 * Connects the Apollo GraphQL server
 * with the Express application.
 */
export const graphqlMiddleware = expressMiddleware(apolloServer);