import { FilterQuery, Model } from 'mongoose';
import * as mongoose from 'mongoose';

export abstract class BaseRepository<
  Base,
  BaseDocument,
  CreateBaseDto,
  UpdateBaseDto,
> {
  constructor(readonly baseModel: Model<BaseDocument>) {}

  create(createBaseDto: CreateBaseDto): Promise<BaseDocument> {
    return this.baseModel.create(createBaseDto) as never;
  }

  findAll(filter: FilterQuery<Base>): Promise<BaseDocument[]> {
    return this.baseModel.find(filter as never).exec();
  }

  findOne(id: string | mongoose.ObjectId): Promise<BaseDocument> {
    return this.baseModel.findById(id).exec() as never;
  }

  getOne(filter: FilterQuery<Base>): Promise<BaseDocument> {
    return this.baseModel.findOne(filter as never).exec() as never;
  }

  update(id: string, updateBaseDto: UpdateBaseDto): Promise<BaseDocument> {
    return this.baseModel
      .findByIdAndUpdate(id, updateBaseDto, { new: true })
      .exec() as Promise<BaseDocument>;
  }

  remove(id: string): Promise<BaseDocument> {
    return this.baseModel.findByIdAndRemove(id).exec();
  }
}
