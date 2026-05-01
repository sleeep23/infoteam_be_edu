import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { FindOrCreateOAuthUserDto, LoginResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateOAuthUser(dto: FindOrCreateOAuthUserDto) {
    return this.userService.findOrCreateOAuthUser(dto);
  }

  async login(user: any): Promise<LoginResponseDto> {
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
        provider: user.provider,
      },
      tokens: {
        accessToken: 'temporary-access-token',
        refreshToken: 'temporary-refresh-token',
      },
    };
  }
}
