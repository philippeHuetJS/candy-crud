import {EventsHandler, IEventHandler} from '@nestjs/cqrs';

import {CatListedEvent} from 'src/shared/events/implementations/cat-listed.event';

@EventsHandler(CatListedEvent)
export class CatListedHandler implements IEventHandler<CatListedEvent> {
  async handle(event: CatListedEvent): Promise<void> {
    console.log(event);
    await Promise.resolve(event);
  }
}
