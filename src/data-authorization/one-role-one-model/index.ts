import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Product')
export class ProductModelForCustomer {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  price: number;
}

@ObjectType('AdminProduct')
export class ProductModelForAdmin extends ProductModelForCustomer {
  @Field()
  buysCount: number;

  @Field()
  viewsCount: number;

  @Field()
  updatedAt: string;

  @Field()
  createdAt: string;
}

/**
 * New role -- Super Admin
 */
@ObjectType('SuperAdminProduct')
export class ProductModelForSuperAdmin extends ProductModelForAdmin {
  @Field()
  pricesHistory: Record<number, Date>;
}
