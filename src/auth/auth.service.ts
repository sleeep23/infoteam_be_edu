import type { StringValue } from 'ms';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {
  FindOrCreateOAuthUserDto,
  LocalLoginDto,
  LocalSignupDto,
  LoginResponseDto,
} from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './types/jwt-payload.type';
import { OAuthUser } from './types/oauth-user.type';
import { AuthenticatedUser, GistoryTokenResponseType } from './types';

import * as bcrypt from 'bcrypt';
import { GistoryUserInfoResponseType } from './types/gistory-user-info-response.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async generateTokens(user: AuthenticatedUser) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      provider: user.provider,
    };
    const accessSecret =
      this.configService.getOrThrow<string>('JWT_ACCESS_SECRET');

    const refreshSecret =
      this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');

    const accessExpiresIn = this.configService.getOrThrow<StringValue>(
      'JWT_ACCESS_EXPIRES_IN',
    );

    const refreshExpiresIn = this.configService.getOrThrow<StringValue>(
      'JWT_REFRESH_EXPIRES_IN',
    );

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: accessSecret,
      expiresIn: accessExpiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateOAuthUser(dto: FindOrCreateOAuthUserDto) {
    return this.userService.findOrCreateOAuthUser(dto);
  }

  async login(user: OAuthUser): Promise<LoginResponseDto> {
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name ?? undefined,
        profileImage: user.profileImage,
        provider: user.provider,
      },
      tokens: await this.generateTokens(user),
    };
  }

  async signup(dto: LocalSignupDto): Promise<LoginResponseDto> {
    const user = await this.userService.createLocalUser(
      dto.email,
      dto.password,
      dto.name,
    );
    return this.login(user);
  }

  async validateLocalUser(dto: LocalLoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !user.passwordHash)
      throw new UnauthorizedException('Invalid email or password');
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password');

    return user;
  }

  async localLogin(dto: LocalLoginDto): Promise<LoginResponseDto> {
    const user = await this.validateLocalUser(dto);
    return this.login(user);
  }

  async gistoryLogin(code: string): Promise<LoginResponseDto> {
    const clientId = this.configService.getOrThrow<string>('GISTORY_CLIENT_ID');
    const clientSecret = this.configService.getOrThrow<string>(
      'GISTORY_CLIENT_SECRET',
    );
    const tokenUrl = this.configService.getOrThrow<string>('GISTORY_TOKEN_URL');
    const userInfoUrl = this.configService.getOrThrow<string>(
      'GISTORY_USERINFO_URL',
    );
    const codeVerifier = this.configService.getOrThrow<string>(
      'GISTORY_CODE_CHALLENGE',
    );
    const basicToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const body = new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      code_verifier: codeVerifier,
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicToken}`,
      },
      body,
    });

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      throw new UnauthorizedException(
        `gistory token exchange failed: ${errorBody}`,
      );
    }

    const tokenBody = (await tokenResponse.json()) as GistoryTokenResponseType;
    const userInfoResponse = await fetch(userInfoUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenBody.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      const errorBody = await userInfoResponse.text();
      throw new UnauthorizedException(`gistory user info failed: ${errorBody}`);
    }

    const profile =
      (await userInfoResponse.json()) as GistoryUserInfoResponseType;

    const user = await this.validateOAuthUser({
      provider: 'gistory',
      providerId: profile.sub,
      email: profile.email,
      name: profile.name,
      profileImage: profile.picture,
    });

    return this.login(user);
  }
}
