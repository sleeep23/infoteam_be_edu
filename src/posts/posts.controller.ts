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
  findAll(@Query() query: FindPostsQueryDto): PostsResponseDto[] {
    return query.userId
      ? this.postsService.findPostsByUserId(query.userId)
      : this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): PostsResponseDto {
    return this.postsService.findById(+id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto): PostsResponseDto {
    return this.postsService.create(createPostDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Query() query: UpdatePostQueryDto,
    @Body() updatePostDto: UpdatePostDto,
  ): PostsResponseDto {
    return this.postsService.update(+id, query.userId, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query() query: DeletePostQueryDto): string {
    return this.postsService.remove(+id, query.userId);
  }
}
