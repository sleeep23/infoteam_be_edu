import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import { OAuthProvider } from './oauth-provider.type';

export class FindOrCreateOAuthUserDto {
  @ApiProperty({
    example: 'google',
    enum: ['google', 'github'],
    description: 'OAuth 로그인 제공자',
  })
  @IsIn(['google', 'github'])
  provider: OAuthProvider;

  @ApiProperty({
    example: '109876543210987654321',
    description: 'OAuth 제공자가 내려준 사용자 고유 ID',
  })
  @IsString()
  providerId: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'OAuth 프로필 이메일',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: '홍길동',
    description: 'OAuth 프로필 이름',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'https://lh3.googleusercontent.com/a/profile-image',
    description: 'OAuth 프로필 이미지 URL',
  })
  @IsOptional()
  @IsUrl()
  profileImage?: string | null;
}
