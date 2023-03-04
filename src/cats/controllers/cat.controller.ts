import {ObjectId} from 'mongoose';

import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query
} from '@nestjs/common';

import {Cat} from 'src/cats/models/schemas/cat.schema';
import {CatDto} from 'src/cats/models/dto/cat.dto';
import {CatService} from 'src/cats/services/cat.service';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  async create(@Body() catInfos: CatDto): Promise<Cat> {
    const created: Cat = await this.catService.add(catInfos);

    return created;
  }

  @Get()
  async list(
    @Query('page') page: number,
    @Query('limit') limit: number
  ): Promise<Cat[]> {
    const listed: Cat[] = await this.catService.fetch(page, limit);

    return listed;
  }

  @Get('/:catId')
  async retrieve(@Param('catId') catId: ObjectId): Promise<Cat> {
    const retrieved: Cat = await this.catService.show(catId);

    return retrieved;
  }

  @Put('/:catId')
  async update(
    @Param('catId') catId: ObjectId,
    @Body() catInfos: CatDto
  ): Promise<Cat> {
    const updated: Cat = await this.catService.edit(catId, catInfos);

    return updated;
  }

  @Delete('/:catId')
  async delete(@Param('catId') catId: ObjectId): Promise<Cat> {
    const deleted: Cat = await this.catService.destroy(catId);

    return deleted;
  }
}
