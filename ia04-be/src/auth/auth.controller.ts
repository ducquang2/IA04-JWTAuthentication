import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginUserDto } from '../modules/users/dto/login-user.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}