import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  signup = async (createUserDto: CreateUserDto) => {
    return await this.userService.create(createUserDto);
  };

  validateUser = async (login: string, password: string) => {
    const user = await this.userService.findByLogin(login);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  };

  login = async (user) => {
    console.log(user);
    const { id, login } = user;
    const accessToken = await this.jwtService.signAsync(
      { userId: id, login },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        userId: id,
        login,
      },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
    return { accessToken, refreshToken };
  };

  refresh = async (body: { refreshToken: string }) => {
    const { refreshToken } = body;
    if (!refreshToken) new UnauthorizedException();
    try {
      const { userId, login } = this.jwtService.verify(refreshToken);
      const user = { id: userId, login };
      return await this.login(user);
    } catch {
      new ForbiddenException();
    }
  };
}
