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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDto } from './dto/error-response.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiOkResponse({
    description: '게시글 목록 조회 성공',
    type: PostsResponseDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: '특정 유저의 게시글 목록 조회',
    type: Number,
  })
  async findAll(
    @Query() query: FindPostsQueryDto,
  ): Promise<PostsResponseDto[]> {
    return query.userId
      ? this.postsService.findPostsByUserId(query.userId)
      : this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 단건 조회' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '게시글 ID',
    type: Number,
  })
  @ApiOkResponse({
    description: '게시글 조회 성공',
    type: PostsResponseDto,
  })
  @ApiNotFoundResponse({
    description: '게시글을 찾을 수 없음',
    type: ErrorResponseDto,
  })
  async findById(@Param('id') id: string): Promise<PostsResponseDto> {
    return this.postsService.findById(+id);
  }

  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiCreatedResponse({
    description: '게시글 생성 성공',
    type: PostsResponseDto,
  })
  @ApiBadRequestResponse({
    description: '잘못 요청된 데이터',
    type: ErrorResponseDto,
  })
  async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostsResponseDto> {
    return this.postsService.create(createPostDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  @ApiOkResponse({
    description: '게시글 수정 성공',
    type: PostsResponseDto,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청 데이터',
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: '수정 권한 없음',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: '게시글을 찾을 수 없음',
    type: ErrorResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Query() query: UpdatePostQueryDto,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostsResponseDto> {
    return this.postsService.update(+id, query.userId, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  @ApiOkResponse({ description: '게시글 삭제 성공', type: String })
  @ApiForbiddenResponse({
    description: '삭제 권한 없음',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: '게시글을 찾을 수 없음',
    type: ErrorResponseDto,
  })
  async remove(
    @Param('id') id: string,
    @Query() query: DeletePostQueryDto,
  ): Promise<string> {
    return this.postsService.remove(+id, query.userId);
  }
}
