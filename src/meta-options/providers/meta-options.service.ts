import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}
  public async findAll(): Promise<MetaOption[]> {
    return await this.metaOptionsRepository.find();
  }

  public async findOne(id: number): Promise<MetaOption> {
    return await this.metaOptionsRepository.findOne({
      where: { post: { id } },
      relations: { post: true },
    });
  }

  public async createOne(
    createPostMetaOptionsDto: CreatePostMetaOptionsDto,
  ): Promise<MetaOption> {
    return await this.metaOptionsRepository.save(
      this.metaOptionsRepository.create(createPostMetaOptionsDto),
    );
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.metaOptionsRepository.delete(id);
  }
}
