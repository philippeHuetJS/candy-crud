import {EventsHandler, IEventHandler} from '@nestjs/cqrs';

import {CatDeletedEvent} from 'src/shared/events/implementations/cat-deleted.event';

@EventsHandler(CatDeletedEvent)
export class CatDeletedHandler implements IEventHandler<CatDeletedEvent> {
  async handle(event: CatDeletedEvent): Promise<void> {
    console.log(event);
    await Promise.resolve(event);
  }
}
