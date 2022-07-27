import { Injectable, NotFoundException } from '@nestjs/common';
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
    const createdUser = this.userRepository.create(createUserDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  };

  findAll = async () => {
    const users = await this.userRepository.find();
    return users.map((el) => el.toResponse());
  };

  findOne = async (id: string) => {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      return user.toResponse();
    } else {
      throw new NotFoundException('User with this id not found');
    }
  };

  update = async (id: string, updateUserDto: UpdateUserDto) => {
    const updatedUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (updatedUser) {
      Object.assign(updatedUser, updateUserDto);
      return await this.userRepository.save(updatedUser);
    } else {
      throw new NotFoundException('User with this id not found');
    }
  };

  remove = async (id: string) => {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User with this id not found');
    }
  };
}
