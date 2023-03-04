import {ObjectId} from 'mongoose';

import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {Injectable} from '@nestjs/common';

import {Cat} from 'src/cats/models/schemas/cat.schema';
import {CatDto} from 'src/cats/models/dto/cat.dto';

import {
  CreateCatCommand,
  UpdateCatCommand,
  DeleteCatCommand
} from 'src/shared/commands';

import {ListCatQuery, RetrieveCatQuery} from 'src/shared/queries';

@Injectable()
export class CatService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async add(catInfos: CatDto): Promise<Cat> {
    const command = new CreateCatCommand(catInfos);

    return this.commandBus.execute(command);
  }

  async fetch(page: number, limit: number): Promise<Cat[]> {
    const query = new ListCatQuery(page, limit);

    return this.queryBus.execute(query);
  }

  async show(catId: ObjectId): Promise<Cat> {
    const query = new RetrieveCatQuery(catId);

    return this.queryBus.execute(query);
  }

  async edit(catId: ObjectId, catInfos: CatDto): Promise<Cat> {
    const command = new UpdateCatCommand(catId, catInfos);

    return this.commandBus.execute(command);
  }

  async destroy(catId: ObjectId): Promise<Cat> {
    const command = new DeleteCatCommand(catId);

    return this.commandBus.execute(command);
  }
}
