import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AdminsNestedFieldResolver,
  UsersQueriesResolver,
  AdminsQueriesResolver,
  UsersItemsMutationsResolver,
  UsersMutationsResolver,
} from './features-authorization/grouped-queries/nicely-grouped';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      fieldResolverEnhancers: ['guards'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AdminsNestedFieldResolver,
    UsersQueriesResolver,
    AdminsQueriesResolver,
    UsersMutationsResolver,
    UsersItemsMutationsResolver,
  ],
})
export class AppModule {}
