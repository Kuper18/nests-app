import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':userId?')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    console.log(postQuery, userId);
    return this.postsService.findAll(postQuery);
  }

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  @Post()
  public async createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return await this.postsService.createOne(createPostDto, user);
  }

  @Patch()
  @ApiOperation({
    summary: 'Update a blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  public updatePost(@Body() updatePostDtop: UpdatePostDto) {
    return this.postsService.update(updatePostDtop);
  }

  @ApiOperation({
    summary: 'Delete post by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    example: {
      test: 12,
    },
  })
  @Delete(':postId')
  public delete(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.delete(postId);
  }
}
