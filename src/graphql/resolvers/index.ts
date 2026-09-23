import { cartResolvers } from "./cart.resolver";
import { orderResolvers } from "./order.resolver";
import { productResolvers } from "./product.resolver";
import { userResolvers } from "./user.resolver";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...productResolvers.Query,
    ...cartResolvers.Query,
    ...orderResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
    ...cartResolvers.Mutation,
    ...orderResolvers.Mutation,
  },
};