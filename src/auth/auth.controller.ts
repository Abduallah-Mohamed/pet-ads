import { LocalAuthGaurd } from './guards/local-auth.guard';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGaurd)
  @Post('login')
  async login(@Req() req: Request): Promise<{ access_token: string }> {
    return this.authService.login(req.user as User);
  }
}
