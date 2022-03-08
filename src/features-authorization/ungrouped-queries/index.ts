import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product, products, users } from './data';

@Resolver()
export class UngroupedResolver {
  @Query()
  async getManyUsers(@Context() ctx: ExecutionContext) {
    const user = getUserFromContext(ctx);
    if (user.isAdmin) {
      return users;
    }

    return null;
  }

  @Query()
  async getManyProducts(@Context() ctx: ExecutionContext) {
    const user = getUserFromContext(ctx);
    if (user.isAdmin) {
      return products;
    }

    return [];
  }

  @Mutation()
  async createProduct(@Context() ctx: ExecutionContext) {
    const user = getUserFromContext(ctx);
    if (!user.isAdmin) {
      throw new ForbiddenException(`Permission denied`);
    }

    return new Product();
  }

  @Mutation()
  async deleteProduct(@Context() ctx: ExecutionContext) {
    const user = getUserFromContext(ctx);
    if (!user.isAdmin) {
      throw new ForbiddenException(`Permission denied`);
    }

    return new Product();
  }
}

function getUserFromContext(ctx: ExecutionContext) {
  return { isAdmin: false };
}
