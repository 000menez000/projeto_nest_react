import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    private users: User[] = [];

    async createUser(CreateUserDto: CreateUserDto): Promise<User> {
        const saltOrRouds = 10;
        const passwordHashed = await hash(CreateUserDto.password, saltOrRouds);
        
        const user: User = {
            ...CreateUserDto,
            id: this.users.length + 1,
            password: passwordHashed,
        };

        this.users.push(user);

        return user;
    };
    
    async getAllUser(): Promise<User[]> {
        return this.users;
    };
};
