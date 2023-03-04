import {IEvent} from '@nestjs/cqrs';

import {CatDto} from 'src/cats/models/dto/cat.dto';

export class CatListedEvent implements IEvent {
  constructor(
    public readonly data: {
      catId: string[];
      catInfos: CatDto[];
    }
  ) {}
}