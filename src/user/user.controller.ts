import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dto/returnUser.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post('create-user')
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  };

  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (UserEntity) => new ReturnUserDto(UserEntity),
    );
  };
};
