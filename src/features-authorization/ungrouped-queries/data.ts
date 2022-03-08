export class User {
  id: string;
  name: string;
}

export class Product {
  id: string;
  title: string;
  price: number;
}

export const users: User[] = [{ id: '1', name: 'John Doe' }];

export const products: Product[] = [{ id: '1', title: 'Bread', price: 100 }];
