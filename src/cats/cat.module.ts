import {CqrsModule} from '@nestjs/cqrs';
import {MongooseModule} from '@nestjs/mongoose';
import {Module} from '@nestjs/common';

import {
  Cat,
  CatSchema as CatSchemaFactory
} from 'src/cats/models/schemas/cat.schema';

import {CatRepository} from 'src/cats/repositories/cat.repository';
import {CatService} from 'src/cats/services/cat.service';
import {CatController} from 'src/cats/controllers/cat.controller';

import {
  CreateCatHandler,
  UpdateCatHandler,
  DeleteCatHandler
} from 'src/shared/commands';

import {ListCatHandler, RetrieveCatHandler} from 'src/shared/queries';

import {
  CatCreatedHandler,
  CatListedHandler,
  CatRetrievedHandler,
  CatUpdatedHandler,
  CatDeletedHandler
} from 'src/shared/events';

import {SharedModule} from 'src/shared/shared.module';

export const CommandHandlers = [
  CreateCatHandler,
  UpdateCatHandler,
  DeleteCatHandler
];

export const QueryHandlers = [ListCatHandler, RetrieveCatHandler];

export const EventHandlers = [
  CatCreatedHandler,
  CatListedHandler,
  CatRetrievedHandler,
  CatUpdatedHandler,
  CatDeletedHandler
];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchemaFactory
      }
    ]),
    SharedModule,
    CqrsModule
  ],
  controllers: [CatController],
  providers: [
    CatService,
    CatRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers
  ]
})
export class CatModule {}
