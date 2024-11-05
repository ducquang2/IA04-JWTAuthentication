import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Endpoint: /users
  @Get('/users')
  findAll() {
    return this.userService.findAll();
  }

  // Endpoint: /users/:id
  @Get('/users/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post('/register')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
