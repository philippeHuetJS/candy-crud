import {ObjectId} from 'mongoose';
import {IQuery} from '@nestjs/cqrs';

export class RetrieveCatQuery implements IQuery {
  constructor(public readonly catId: ObjectId) {}
}
