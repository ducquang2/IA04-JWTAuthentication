import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }
  
  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.databaseService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (checkUser && checkUser.id) {
      throw new ConflictException('User existed!!');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    return this.databaseService.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
  }
}
