import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product, products, users } from './data';

@Resolver()
export class SemiGroupedResolver {
  @Query('users_getManyUsers')
  async getManyUsers(@Context() ctx: ExecutionContext) {
    const user = getUserFromContext(ctx);
    if (user.isAdmin) {
      return users;
    }

    return null;
  }

  @Query('users_getManyProducts')
  async getManyProductsForUser() {
    return products;
  }

  @Query('admins_getManyProducts')
  async getManyProductsForAdmin(@Context() ctx: ExecutionContext) {
    const user = getUserFromContext(ctx);
    if (user.isAdmin) {
      return products;
    }

    return [];
  }

  @Mutation('admins_createProduct')
  async createProduct(@Context() ctx: ExecutionContext) {
    const user = getUserFromContext(ctx);
    if (!user.isAdmin) {
      throw new ForbiddenException(`Permission denied`);
    }

    return new Product();
  }

  @Mutation('admins_deleteProduct')
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
