import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async createOne(
    createPostDto: CreatePostDto,
    user: ActiveUserData,
  ): Promise<Post> {
    let author;
    let tags;

    try {
      author = await this.usersService.findOneById(user.sub);
      tags = await this.tagsService.findMany(createPostDto.tags);
    } catch {
      throw new ConflictException('Error in author and tag block');
    }

    if (createPostDto.tags.length !== tags.length) {
      throw new BadRequestException('Tags ids is not match with founded tags.');
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    try {
      return await this.postsRepository.save(post);
    } catch {
      throw new ConflictException('Cannot save post.');
    }
  }
}
