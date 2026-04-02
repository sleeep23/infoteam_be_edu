import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { PostsResponseDto } from '../dto';
import {
  ApiBadRequest,
  ApiForbidden,
  ApiNotFound,
} from 'src/common/decorators/api-errors.decorator';

export function ApiGetPosts() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 목록 조회' }),
    ApiOkResponse({
      description: '게시글 목록 조회 성공',
      type: PostsResponseDto,
      isArray: true,
    }),
    ApiQuery({
      name: 'userId',
      required: false,
      description: '특정 유저의 게시글 목록 조회',
      type: Number,
    }),
  );
}

export function ApiGetPostById() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 단건 조회' }),
    ApiOkResponse({
      description: '게시글 조회 성공',
      type: PostsResponseDto,
    }),
    ApiNotFound(),
  );
}

export function ApiCreatePost() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 생성' }),
    ApiCreatedResponse({
      description: '게시글 생성 성공',
      type: PostsResponseDto,
    }),
    ApiBadRequest(),
  );
}

export function ApiUpdatePost() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 수정' }),
    ApiOkResponse({
      description: '게시글 수정 성공',
      type: PostsResponseDto,
    }),
    ApiBadRequest(),
    ApiNotFound(),
    ApiForbidden(),
  );
}

export function ApiDeletePost() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 삭제' }),
    ApiOkResponse({ description: '게시글 삭제 성공', type: String }),
    ApiNotFound(),
    ApiForbidden(),
  );
}
