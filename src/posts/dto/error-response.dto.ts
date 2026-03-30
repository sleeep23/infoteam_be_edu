import { ApiProperty } from '@nestjs/swagger';
export class ErrorResponseDto {
  @ApiProperty({
    example: 404,
    description: 'HTTP 상태 코드',
  })
  statusCode: number;
  @ApiProperty({
    example: 'Post not found',
    description: '에러 메시지',
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  message: string | string[];
  @ApiProperty({
    example: 'Not Found',
    description: '에러 이름',
  })
  error: string;
  @ApiProperty({
    example: '/posts/123',
    description: '요청 경로',
  })
  path: string;
  @ApiProperty({
    example: '2026-03-31T12:00:00.000Z',
    description: '에러 발생 시각',
  })
  timestamp: string;
}
