import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  price: number;
}

export const users: User[] = [{ id: '1', name: 'John Doe' }];

export const products: Product[] = [{ id: '1', title: 'Bread', price: 100 }];
