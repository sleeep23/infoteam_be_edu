import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiPropertyOptional({
    example: 'NestJS Swagger 설정하기',
    description: '게시글 제목',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    example: 'Swagger를 프로젝트에 적용하는 방법을 정리합니다.',
    description: '게시글 내용',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}
