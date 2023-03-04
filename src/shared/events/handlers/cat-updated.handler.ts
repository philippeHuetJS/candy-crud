import {EventsHandler, IEventHandler} from '@nestjs/cqrs';

import {CatUpdatedEvent} from 'src/shared/events/implementations/cat-updated-event';

@EventsHandler(CatUpdatedEvent)
export class CatUpdatedHandler implements IEventHandler<CatUpdatedEvent> {
  async handle(event: CatUpdatedEvent): Promise<void> {
    console.log(event);
    await Promise.resolve(event);
  }
}
