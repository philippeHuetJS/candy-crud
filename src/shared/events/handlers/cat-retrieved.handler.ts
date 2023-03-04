import {EventsHandler, IEventHandler} from '@nestjs/cqrs';

import {CatRetrievedEvent} from 'src/shared/events/implementations/cat-retrieved.event';

@EventsHandler(CatRetrievedEvent)
export class CatRetrievedHandler implements IEventHandler<CatRetrievedEvent> {
  async handle(event: CatRetrievedEvent): Promise<void> {
    console.log(event);
    await Promise.resolve(event);
  }
}
