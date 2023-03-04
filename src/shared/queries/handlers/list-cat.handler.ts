import {IQueryHandler, QueryHandler, EventBus} from '@nestjs/cqrs';

import {Cat} from 'src/cats/models/schemas/cat.schema';
import {ListCatQuery} from 'src/shared/queries/implementations/list-cat.query';
import {CatRepository} from 'src/cats/repositories/cat.repository';
import {CatListedEvent} from 'src/shared/events/implementations/cat-listed.event';
import {CatPublishMapUtil} from 'src/shared/utils/cat.publish-map.util';

@QueryHandler(ListCatQuery)
export class ListCatHandler implements IQueryHandler<ListCatQuery> {
  constructor(
    private readonly catRepository: CatRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(query: ListCatQuery): Promise<Cat[]> {
    const {page, limit}: ListCatQuery = query;
    const fetched: Cat[] = await this.catRepository.fetch(page, limit);

    this.eventBus.publish(
      new CatListedEvent({
        catId: CatPublishMapUtil.convertAndListMappedId(
          fetched as unknown as Cat[]
        ),
        catInfos: CatPublishMapUtil.convertAndListMappedInfos(
          fetched as unknown as Cat[]
        )
      })
    );

    return fetched;
  }
}
