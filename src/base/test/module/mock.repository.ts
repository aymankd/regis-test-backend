import { NotFoundException } from '@nestjs/common';
import { Document, FilterQuery } from 'mongoose';

export abstract class MockRepository<
  ModelBase,
  ModelDocument extends Document,
  CreateModelDto,
  UpdateModelDto,
> {
  protected abstract entityStub: ModelDocument;

  async create(createFileDto: CreateModelDto): Promise<ModelDocument> {
    return { ...this.entityStub, ...createFileDto } as ModelDocument;
  }

  async findAll(filter: FilterQuery<ModelBase>): Promise<ModelDocument[]> {
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(this.entityStub, key)) {
        const element = this.entityStub[key];
        const filterelem = filter[key];
        if (element !== filterelem) return [];
      } else return [];
    }
    return [this.entityStub];
  }

  async findOne(id: string): Promise<ModelDocument> {
    if (this.entityStub._id.toString() !== id)
      throw new NotFoundException(`File with ID ${id} not found`);
    return this.entityStub;
  }

  async getOne(filter: FilterQuery<ModelBase>): Promise<ModelDocument> {
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(this.entityStub, key)) {
        const element = this.entityStub[key];
        const filterelem = filter[key];
        if (element !== filterelem) return null;
      } else return null;
    }
    return this.entityStub;
  }

  async update(
    id: string,
    updateFileDto: UpdateModelDto,
  ): Promise<ModelDocument> {
    const entity = this.entityStub;
    if (id === entity._id.toString())
      return { ...entity, ...updateFileDto } as ModelDocument;
    return null;
  }

  async remove(id: string): Promise<ModelDocument> {
    return id === this.entityStub._id.toString() ? this.entityStub : null;
  }
}
