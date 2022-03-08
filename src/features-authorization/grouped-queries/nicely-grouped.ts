import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product, products, User, users } from './data';

@ObjectType('UsersQueries')
export class UsersQueries {
  @Field(() => [Product])
  getProducts: Product[];
}

@ObjectType('AdminsNestedField')
export class AdminsNestedField {
  @Field()
  secretField: string;
}

@ObjectType('AdminsQueries')
export class AdminsQueries {
  @Field(() => [Product])
  getProducts: Product[];

  @Field(() => [User])
  getUsers: User[];

  @Field(() => AdminsNestedField)
  nestedField: AdminsNestedField;
}

@Resolver(() => UsersQueries)
export class UsersQueriesResolver {
  @Query(() => UsersQueries)
  users() {
    return {};
  }

  @ResolveField(() => [Product])
  async getProducts(): Promise<Product[]> {
    return products;
  }
}

@Resolver(() => AdminsQueries)
export class AdminsQueriesResolver {
  @Query(() => AdminsQueries)
  admins() {
    return {};
  }

  @ResolveField(() => [Product])
  async getProducts(): Promise<Product[]> {
    return products;
  }

  @ResolveField(() => [User])
  async getUsers(): Promise<User[]> {
    return users;
  }

  @ResolveField(() => AdminsNestedField)
  async nestedField(
    @Args('someArg', { nullable: true }) arg: string,
  ): Promise<AdminsNestedField> {
    console.log('arg :>> ', arg);

    return {} as AdminsNestedField;
  }
}

@Resolver(() => AdminsNestedField)
export class AdminsNestedFieldResolver {
  @ResolveField()
  async secretField(): Promise<string> {
    return 'Secret field!';
  }
}

//----------

export const Namespace = ResolveField;
export const NamespaceMutation = ResolveField;

@ObjectType('UsersProductsMutations')
export class UsersProductsMutations {
  @Field(() => Product)
  makeProductFavorite: Product;
}

@ObjectType('UsersMutations')
export class UsersMutations {
  @Field(() => UsersProductsMutations)
  products: UsersProductsMutations;
}

@Resolver(() => UsersMutations)
export class UsersMutationsResolver {
  @Mutation(() => UsersMutations, { name: 'users' })
  root() {
    return new UsersMutations();
  }

  @Namespace(() => UsersProductsMutations)
  async products() {
    return new UsersProductsMutations();
  }
}

@Resolver(() => UsersProductsMutations)
export class UsersItemsMutationsResolver {
  @NamespaceMutation(() => Product)
  @UseGuards({ canActivate: () => Math.random() > 0.5 })
  async makeProductFavorite(@Args('id') id: string) {
    console.log('id :>> ', id);

    return products[0];
  }
}
