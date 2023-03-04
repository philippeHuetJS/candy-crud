import {Model, ObjectId} from 'mongoose';

import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';

import {Cat, DCat} from 'src/cats/models/schemas/cat.schema';
import {CatDto} from 'src/cats/models/dto/cat.dto';
import {BaseRepository} from 'src/cats/repositories/base.repository';
import {CatBadRequestException} from 'src/shared/exceptions/cat.bad-request.exception';

@Injectable()
export class CatRepository extends BaseRepository<Cat, CatDto> {
  constructor(@InjectModel(Cat.name) public readonly catModel: Model<DCat>) {
    super(catModel);
  }

  async add(catInfos: CatDto): Promise<Cat> {
    const added: Cat = await this.create(catInfos);

    return added;
  }

  async fetch(page: number, limit: number): Promise<Cat[]> {
    const fetched: Cat[] = await this.find(page, limit);

    return fetched;
  }

  async show(catId: ObjectId): Promise<Cat> {
    try {
      const showed: Cat = await this.findById(catId);

      return showed;
    } catch {
      throw new CatBadRequestException();
    }
  }

  async edit(catId: ObjectId, catInfos: CatDto): Promise<Cat> {
    try {
      const edited: Cat = await this.findByIdAndUpdate(catId, catInfos);

      return edited;
    } catch {
      throw new CatBadRequestException();
    }
  }

  async destroy(catId: ObjectId): Promise<Cat> {
    try {
      const destroyed: Cat = await this.findByIdAndRemove(catId);

      return destroyed;
    } catch {
      throw new CatBadRequestException();
    }
  }
}
