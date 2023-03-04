import {IQueryHandler, QueryHandler, EventBus} from '@nestjs/cqrs';

import {Cat} from 'src/cats/models/schemas/cat.schema';
import {RetrieveCatQuery} from 'src/shared/queries/implementations/retrieve-cat.query';
import {CatRepository} from 'src/cats/repositories/cat.repository';
import {CatRetrievedEvent} from 'src/shared/events/implementations/cat-retrieved.event';
import {CatNotFoundException} from 'src/shared/exceptions/cat.not-found.exception';
import {CatDto} from 'src/cats/models/dto/cat.dto';

@QueryHandler(RetrieveCatQuery)
export class RetrieveCatHandler implements IQueryHandler<RetrieveCatQuery> {
  constructor(
    private readonly catRepository: CatRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(query: RetrieveCatQuery): Promise<Cat> {
    const {catId}: RetrieveCatQuery = query;
    const showed: Cat = await this.catRepository.show(catId);

    if (!showed) {
      throw new CatNotFoundException();
    }

    this.eventBus.publish(
      new CatRetrievedEvent({
        catId: JSON.stringify(showed._id),
        catInfos: {
          name: showed.name,
          age: showed.age,
          breed: showed.breed
        } as unknown as CatDto
      })
    );

    return showed;
  }
}
