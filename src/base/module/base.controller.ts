import { Body, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { BaseService } from './base.service';

export abstract class BaseController<
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
  SuperBaseService extends BaseService<
    Base,
    BaseDocument,
    CreateBaseDto,
    UpdateBaseDto,
    SuperBaseRepository
  >,
> {
  constructor(readonly superBaseService: SuperBaseService) {}

  @Post()
  create(@Body() createBaseDto: CreateBaseDto) {
    return this.superBaseService.create(createBaseDto);
  }

  @Get()
  findAll(filter: any = {}) {
    return this.superBaseService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superBaseService.findOne(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.superBaseService.updateOne(id, updateBaseDto);
  }
}
