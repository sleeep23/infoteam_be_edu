import { ApiProperty } from '@nestjs/swagger';

export class PostsResponseDto {
  @ApiProperty({
    example: 1,
    description: '게시글 ID',
  })
  id: number;
  @ApiProperty({
    example: 'NestJS Swagger 설정하기',
    description: '게시글 제목',
  })
  title: string;
  @ApiProperty({
    example: 'Swagger를 프로젝트에 적용하는 방법을 정리합니다.',
    description: '게시글 내용',
  })
  content: string;
  @ApiProperty({
    example: 1,
    description: '작성자 ID',
  })
  userId: number;
}
