import { ApolloServer } from "@apollo/server";

import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});