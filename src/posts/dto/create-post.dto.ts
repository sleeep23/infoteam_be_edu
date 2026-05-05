import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'NestJS Swagger 설정하기',
    description: '게시글 제목',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Swagger를 프로젝트에 적용하는 방법을 정리합니다.',
    description: '게시글 내용',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
