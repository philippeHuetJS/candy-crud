import {FilterQuery, Model, UpdateQuery} from 'mongoose';

export abstract class BaseRepository<T, V> {
  protected readonly baseModel: Model<T>;
  protected readonly basePopulate: string[];

  constructor(baseModel: Model<T>, basePopulate: string[] = []) {
    this.baseModel = baseModel;
    this.basePopulate = basePopulate;
  }

  public async create(item: Partial<V>): Promise<T> {
    return this.baseModel.create(item);
  }

  public async find(page: number, limit: number): Promise<T[]> {
    return this.baseModel
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate(this.basePopulate)
      .exec();
  }

  public async findById(id: FilterQuery<T>): Promise<T> {
    return Promise.resolve(
      this.baseModel
        .findById(id)
        .populate(this.basePopulate)
        .exec() as unknown as T
    );
  }

  public async findByIdAndUpdate(
    id: FilterQuery<T>,
    item: Partial<V>
  ): Promise<T> {
    return Promise.resolve(
      this.baseModel
        .findByIdAndUpdate(
          id,
          {$set: item as unknown as UpdateQuery<T>},
          {new: true}
        )
        .exec() as unknown as T
    );
  }

  public async findByIdAndRemove(id: FilterQuery<T>): Promise<T> {
    return Promise.resolve(
      this.baseModel.findByIdAndRemove(id) as unknown as T
    );
  }
}
