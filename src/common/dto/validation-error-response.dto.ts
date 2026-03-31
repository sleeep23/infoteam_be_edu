import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponseDto {
  @ApiProperty({
    example: 400,
    description: 'HTTP 상태 코드',
  })
  statusCode: number;
  @ApiProperty({
    example: ['error1', 'error2'],
    description: '에러 메시지',
    type: [String],
  })
  message: string[];
  @ApiProperty({
    example: 'Bad Request',
    description: '에러 이름',
  })
  error: string;
  @ApiProperty({
    example: '/posts',
    description: '요청 경로',
  })
  path: string;
  @ApiProperty({
    example: '2026-03-31T12:00:00.000Z',
    description: '에러 발생 시각',
  })
  timestamp: string;
}
