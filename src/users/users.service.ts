import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma/src/prisma.service';
import { FindOrCreateOAuthUserDto, OAuthProvider } from 'src/auth/dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // async findOne(userName: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.userName === userName);
  // }

  async findByOAuth(provider: OAuthProvider, providerId: string) {
    return this.prisma.user.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
      },
    });
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async createOAuthUser(dto: FindOrCreateOAuthUserDto) {
    return this.prisma.user.create({
      data: {
        provider: dto.provider,
        providerId: dto.providerId,
        email: dto.email,
        name: dto.name,
        profileImage: dto.profileImage,
      },
    });
  }
  async findOrCreateOAuthUser(dto: FindOrCreateOAuthUserDto) {
    const existingUser = await this.findByOAuth(dto.provider, dto.providerId);
    if (existingUser) {
      return existingUser;
    }
    return this.createOAuthUser(dto);
  }
}
