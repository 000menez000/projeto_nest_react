import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class AppController {
  
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() createUser: CreateUserDto) {
    console.log('teste');
    return this.userService.createUser(createUser);
  };
};
