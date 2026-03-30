import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(
    @Query() query: FindPostsQueryDto,
  ): Promise<PostsResponseDto[]> {
    return query.userId
      ? this.postsService.findPostsByUserId(query.userId)
      : this.postsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PostsResponseDto> {
    return this.postsService.findById(+id);
  }

  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostsResponseDto> {
    return this.postsService.create(createPostDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Query() query: UpdatePostQueryDto,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostsResponseDto> {
    return this.postsService.update(+id, query.userId, updatePostDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Query() query: DeletePostQueryDto,
  ): Promise<string> {
    return this.postsService.remove(+id, query.userId);
  }
}
