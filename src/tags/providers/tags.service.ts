import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    return await this.tagsRepository.save(
      this.tagsRepository.create(createTagDto),
    );
  }

  public async findMany(tags: number[]) {
    return await this.tagsRepository.find({ where: { id: In(tags) } });
  }

  public async delete(tagId: number) {
    return await this.tagsRepository.delete(tagId);
  }

  public async softDelete(tagId: number) {
    return await this.tagsRepository.softDelete(tagId);
  }
}
