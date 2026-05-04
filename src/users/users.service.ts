import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma/src/prisma.service';
import { FindOrCreateOAuthUserDto, OAuthProvider } from 'src/auth/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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

  async createLocalUser(email: string, password: string, name?: string) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        provider: 'local',
        providerId: email,
      },
    });
  }
}
