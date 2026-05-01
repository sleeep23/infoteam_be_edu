import { ApiProperty } from '@nestjs/swagger';
import { AuthTokenResponseDto } from './auth-token-response.dto';
import { AuthUserResponseDto } from './auth-user-response.dto';

export class LoginResponseDto {
  @ApiProperty({
    type: AuthUserResponseDto,
    description: '로그인한 사용자 정보',
  })
  user: AuthUserResponseDto;

  @ApiProperty({
    type: AuthTokenResponseDto,
    description: 'JWT 토큰 정보',
  })
  tokens: AuthTokenResponseDto;
}
