import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Redirect,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthenticatedUser, OAuthUser } from './types';
import { LocalLoginDto, LocalSignupDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiBearerAuth()
  googleLogin() {
    // guard가 구글 로그인 페이지로 리다이렉션 시킴
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiBearerAuth()
  googleCallback(@Req() user: OAuthUser) {
    return this.authService.login(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@Req() req: Request & { user: AuthenticatedUser }) {
    return req.user;
  }

  @Post('login')
  login(@Body() dto: LocalLoginDto) {
    return this.authService.localLogin(dto);
  }

  @Post('signup')
  signup(@Body() dto: LocalSignupDto) {
    return this.authService.signup(dto);
  }

  @Get('gistory')
  @Redirect()
  gistoryLogin() {
    const params = new URLSearchParams({
      client_id: process.env.GISTORY_CLIENT_ID!,
      redirect_uri: process.env.GISTORY_CALLBACK_URL!,
      response_type: 'code',
      scope: process.env.GISTORY_SCOPES!,
      code_challenge: process.env.GISTORY_CODE_CHALLENGE!,
      code_challenge_method: 'plain',
    });
    const url = `${process.env.GISTORY_AUTHORIZE_URL}?${params.toString()}`;
    return { url };
  }

  @Get('gistory/callback')
  async gistoryCallback(@Query('code') code: string) {
    return this.authService.gistoryLogin(code);
  }
}
