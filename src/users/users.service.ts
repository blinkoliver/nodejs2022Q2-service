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
      return (await this.userRepository.save(createdUser)).toResponse();
    } catch (error) {
      throw new BadRequestException();
    }
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
    if (updatedUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }
    updatedUser.password = updateUserDto.newPassword;
    return (await this.userRepository.save(updatedUser)).toResponse();
  };

  remove = async (id: string) => {
    await this.findOne(id);
    await this.userRepository.delete(id);
  };
}
