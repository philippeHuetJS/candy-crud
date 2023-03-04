import {ObjectId} from 'mongoose';
import {ICommand} from '@nestjs/cqrs';

import {CatDto} from 'src/cats/models/dto/cat.dto';

export class UpdateCatCommand implements ICommand {
  constructor(
    public readonly catId: ObjectId,
    public readonly catInfos: CatDto
  ) {}
}
