import { BaseRepository } from './base.repository';

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

  findAll(filter: any) {
    return this.superBaseRepository.findAll(filter);
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
