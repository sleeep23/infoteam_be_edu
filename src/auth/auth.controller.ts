import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
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
  @ApiBearerAuth()
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // guard가 구글 로그인 페이지로 리다이렉션 시킴
  }

  @Get('google/callback')
  @ApiBearerAuth()
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() user: OAuthUser) {
    return this.authService.login(user);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
}
