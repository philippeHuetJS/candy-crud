import {IQuery} from '@nestjs/cqrs';

export class ListCatQuery implements IQuery {
  constructor(public readonly page: number, public readonly limit: number) {}
}
