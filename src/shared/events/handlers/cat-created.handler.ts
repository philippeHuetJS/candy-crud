import {EventsHandler, IEventHandler} from '@nestjs/cqrs';

import {CatCreatedEvent} from 'src/shared/events/implementations/cat-created.event';

@EventsHandler(CatCreatedEvent)
export class CatCreatedHandler implements IEventHandler<CatCreatedEvent> {
  async handle(event: CatCreatedEvent): Promise<void> {
    console.log(event);
    await Promise.resolve(event);
  }
}
