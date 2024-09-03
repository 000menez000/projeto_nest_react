import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {};

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    };

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new NotFoundException(`UserId <${userId}> Not Found`);
        };

        return user;
    };

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: ['addresses']
        });
    };

    async createUser(CreateUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRouds = 10;
        const passwordHashed = await hash(CreateUserDto.password, saltOrRouds);
        
        return this.userRepository.save({
            ...CreateUserDto,
            password: passwordHashed,
        });
    };
    
};
