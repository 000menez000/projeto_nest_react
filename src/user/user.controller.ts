import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dto/returnUser.dto';

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

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number,) {
    return this.userService.getUserByIdUsingRelations(userId);
  };
};
