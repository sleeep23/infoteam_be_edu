import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OAuthProvider } from './oauth-provider.type';

export class AuthUserResponseDto {
  @ApiProperty({
    example: 1,
    description: '사용자 ID',
  })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일',
  })
  email: string;

  @ApiPropertyOptional({
    example: '홍길동',
    description: '사용자 이름',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'https://lh3.googleusercontent.com/a/profile-image',
    description: '사용자 프로필 이미지 URL',
  })
  profileImage?: string | null;

  @ApiProperty({
    example: 'google',
    enum: ['google', 'github'],
    description: '가입 또는 로그인에 사용한 OAuth 제공자',
  })
  provider: OAuthProvider;
}
