import { Body, Controller, Get, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}
  @Get()
  public async getAll() {
    return await this.metaOptionsService.findAll();
  }

  @Post()
  public async createOne(
    @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    return await this.metaOptionsService.createOne(createPostMetaOptionsDto);
  }
}
