import { ExecutionContext } from '@nestjs/common';
import {
  Context,
  Field,
  ObjectType,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';

@ObjectType('Product')
export class ProductModelForAllRoles {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  buysCount?: number;

  @Field({ nullable: true })
  viewsCount?: number;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field({ nullable: true })
  createdAt?: string;
}

@Resolver(() => ProductModelForAllRoles)
export class FieldResolver {
  /**
   * NO SIDE-EFFECTS, PLEASE.
   * ONLY SYNC CODE!
   */
  @ResolveField()
  buysCount(
    @Context() ctx: ExecutionContext,
    @Root() root: ProductModelForAllRoles,
  ): number | null {
    const user = getUserFromContext(ctx);
    if (!user.isAdmin) {
      return null;
    }

    return root.buysCount;
  }

  @ResolveField()
  viewsCount(
    @Context() ctx: ExecutionContext,
    @Root() root: ProductModelForAllRoles,
  ): number | null {
    const user = getUserFromContext(ctx);
    if (!user.isAdmin) {
      return null;
    }

    return root.viewsCount;
  }

  @ResolveField()
  updatedAt(
    @Context() ctx: ExecutionContext,
    @Root() root: ProductModelForAllRoles,
  ): string | null {
    const user = getUserFromContext(ctx);
    if (!user.isAdmin) {
      return null;
    }

    return root.updatedAt;
  }

  @ResolveField()
  createdAt(
    @Context() ctx: ExecutionContext,
    @Root() root: ProductModelForAllRoles,
  ): string | null {
    const user = getUserFromContext(ctx);
    if (!user.isAdmin) {
      return null;
    }

    return root.createdAt;
  }
}

function getUserFromContext(ctx: ExecutionContext) {
  return { isAdmin: false };
}
