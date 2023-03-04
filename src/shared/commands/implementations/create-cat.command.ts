import {ICommand} from '@nestjs/cqrs';

import {CatDto} from 'src/cats/models/dto/cat.dto';

export class CreateCatCommand implements ICommand {
  constructor(public readonly catInfos: CatDto) {}
}
