import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  };

  @Get()
  async getAllUser() {
    return this.userService.getAllUsers();
  }
};
