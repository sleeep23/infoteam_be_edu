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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsResponseDto } from './dto/post-response.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('userId') userId?: string): PostsResponseDto[] {
    if (userId) {
      return this.postsService.findPostsByUserId(+userId);
    }
    return this.postsService.findAll();
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
    @Query('userId') userId: string,
    @Body() updatePostDto: UpdatePostDto,
  ): PostsResponseDto {
    return this.postsService.update(+id, +userId, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('userId') userId: string): string {
    return this.postsService.remove(+id, +userId);
  }
}
