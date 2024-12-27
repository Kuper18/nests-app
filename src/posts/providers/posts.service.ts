import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOptionsService } from 'src/meta-options/providers/meta-options.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreatePostProvider } from './create-post.provider';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly metaOptionsService: MetaOptionsService,
    private readonly tagsService: TagsService,
    private readonly createPostProvider: CreatePostProvider,

    private readonly paginationProvider: PaginationProvider,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async findAll(
    postQuery: GetPostsDto,
    // userId: string,
  ): Promise<Paginated<Post>> {
    const result = await this.paginationProvider.paginateQuery(
      { limit: postQuery.limit, page: postQuery.page },
      this.postsRepository,
    );

    return result;
  }

  public async createOne(
    createPostDto: CreatePostDto,
    user: ActiveUserData,
  ): Promise<Post> {
    return await this.createPostProvider.createOne(createPostDto, user);
  }

  public async update(updatePostDto: UpdatePostDto) {
    const { id, content, imageUrl, postType, schema, slug, status, title } =
      updatePostDto;
    let tags;
    let post;

    try {
      tags = await this.tagsService.findMany(updatePostDto.tags);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment.',
      );
    }

    if (!tags || tags.length !== updatePostDto.tags.length) {
      throw new BadRequestException('Tags Ids are incorrect.');
    }

    try {
      post = await this.postsRepository.findOne({
        where: { id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment.',
      );
    }

    if (!post) {
      throw new BadRequestException('Post not found.');
    }

    post.title = title ?? post.title;
    post.content = content ?? post.content;
    post.imageUrl = imageUrl ?? post.imageUrl;
    post.status = status ?? post.status;
    post.postType = postType ?? post.postType;
    post.schema = schema ?? post.schema;
    post.slug = slug ?? post.slug;
    post.tags = tags;

    try {
      await this.postsRepository.save(post);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment.',
      );
    }

    return post;
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);

    return { message: `Post by id: '${id}' was deleted` };
  }
}
