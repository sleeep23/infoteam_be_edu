import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  CreatePostDto,
  DeletePostQueryDto,
  FindPostsQueryDto,
  PostsResponseDto,
  UpdatePostDto,
  UpdatePostQueryDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreatePost,
  ApiDeletePost,
  ApiGetPostById,
  ApiGetPosts,
  ApiUpdatePost,
} from './decorators/api-posts.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiGetPosts()
  async findAll(
    @Query() query: FindPostsQueryDto,
  ): Promise<PostsResponseDto[]> {
    return query.userId
      ? this.postsService.findPostsByUserId(query.userId)
      : this.postsService.findAll();
  }

  @Get(':id')
  @ApiGetPostById()
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostsResponseDto> {
    return this.postsService.findById(+id);
  }

  @Post()
  @ApiCreatePost()
  async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostsResponseDto> {
    return this.postsService.create(createPostDto);
  }

  @Patch(':id')
  @ApiUpdatePost()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: UpdatePostQueryDto,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostsResponseDto> {
    return this.postsService.update(+id, query.userId, updatePostDto);
  }

  @Delete(':id')
  @ApiDeletePost()
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: DeletePostQueryDto,
  ): Promise<string> {
    return this.postsService.remove(+id, query.userId);
  }
}
