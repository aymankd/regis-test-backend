import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class MockModel<T extends Document> {
  protected abstract entityStub: T;

  constructorSpy(_createEntityData: T): void {}

  async save(): Promise<T> {
    return this.entityStub;
  }

  constructor(private entityModel: Model<T>) {}

  findOne(
    _entityFilterQuery_: FilterQuery<T>,
    _projection_?: Record<string, unknown>,
  ): { exec: () => Promise<T | null> } {
    return {
      exec: async () => {
        return this.entityStub;
      },
    };
  }

  findById(
    id: any,
    _projection_?: Record<string, unknown>,
  ): { exec: () => Promise<T | null> } {
    return {
      exec: async () => {
        return this.entityStub._id.toString() === id ? this.entityStub : null;
      },
    };
  }

  find(_entityFilterQuery_: FilterQuery<T>): {
    exec: () => Promise<T[] | null>;
  } {
    return {
      exec: async () => {
        return [this.entityStub];
      },
    };
  }

  async create(createEntityData: unknown): Promise<T> {
    this.constructorSpy(createEntityData as T);
    return this.save();
  }

  findByIdAndUpdate(
    id: string,
    updateEntityData: UpdateQuery<T>,
  ): {
    exec: () => Promise<T | null>;
  } {
    return {
      exec: async () => {
        let entity = this.entityStub;
        if (id === entity._id.toString())
          entity = { ...entity, ...updateEntityData };
        return entity;
      },
    };
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
  findByIdAndRemove(id: string): {
    exec: () => Promise<T | null>;
  } {
    return {
      exec: async () => {
        return id === this.entityStub._id.toString() ? this.entityStub : null;
      },
    };
  }
}
