import { BaseRepository } from './base.repository';
import { CollectionDto } from '@forlagshuset/nestjs-mongoose-paginate';
export abstract class BaseService<
  Base,
  BaseDocument,
  CreateBaseDto,
  UpdateBaseDto,
  SuperBaseRepository extends BaseRepository<
    Base,
    BaseDocument,
    CreateBaseDto,
    UpdateBaseDto
  >,
> {
  constructor(private readonly superBaseRepository: SuperBaseRepository) {}

  findAll(filter: CollectionDto) {
    return this.superBaseRepository.paginate(filter);
  }

  async findOne(type: string) {
    return this.superBaseRepository.findOne(type);
  }

  async create(createBaseDto: CreateBaseDto) {
    return this.superBaseRepository.create(createBaseDto);
  }

  async updateOne(id: string, updateBaseDto: UpdateBaseDto) {
    return this.superBaseRepository.update(id, updateBaseDto);
  }
}
