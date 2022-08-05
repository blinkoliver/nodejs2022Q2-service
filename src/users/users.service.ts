import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create = async (createUserDto: CreateUserDto) => {
    try {
      const createdUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(createdUser);
    } catch (error) {
      throw new BadRequestException();
    }
  };

  findAll = async () => {
    return await this.userRepository.find();
  };

  findOne = async (id: string) => {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User with this id not found');
    }
  };

  findByLogin = async (login: string) => {
    return await this.userRepository.findOne({ where: { login } });
  };

  update = async (id: string, updateUserDto: UpdateUserDto) => {
    const updatedUser = await this.findOne(id);
    if (updatedUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }
    updatedUser.password = updateUserDto.newPassword;
    return await this.userRepository.save(updatedUser);
  };

  remove = async (id: string) => {
    await this.findOne(id);
    await this.userRepository.delete(id);
  };
}
