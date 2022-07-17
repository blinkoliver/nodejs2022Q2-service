import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataBase } from 'src/database/database';
import { v4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private db: DataBase<User>;

  constructor() {
    this.db = new DataBase<User>(User);
  }

  create = (createUserDto: CreateUserDto) => {
    const data = {
      id: v4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return this.db.create(data);
  };

  findAll = () => {
    return this.db.readAll();
  };

  findOne = (id: string) => {
    return this.db.read(id);
  };

  update = async (id: string, updateUserDto: UpdateUserDto) => {
    const user = await this.findOne(id);
    if (updateUserDto.oldPassword === user.password) {
      const data = {
        ...user,
        password: updateUserDto.newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      };
      return this.db.update(id, data);
    } else {
      throw new ForbiddenException();
    }
  };

  remove = async (id: string) => {
    await this.findOne(id);
    return this.db.delete(id);
  };
}
