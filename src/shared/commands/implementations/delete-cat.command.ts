import {ObjectId} from 'mongoose';
import {ICommand} from '@nestjs/cqrs';

export class DeleteCatCommand implements ICommand {
  constructor(public readonly catId: ObjectId) {}
}
