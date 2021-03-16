import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from 'src/shared/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { isPasswordMatched } from './../shared/helpers';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate({ email, password }): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('Wrong credentials.');
    }

    const passwordMatched = await isPasswordMatched(password, user.password);
    console.log(passwordMatched);

    if (user && passwordMatched) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }
    throw new BadRequestException('Wrong credentials.');
  }

  async login(body: UserDto) {
    const user = await this.validate(body);

    if (!user) {
      throw new BadRequestException('Wrong credentials.');
    }

    const jwt = { sub: user.id, email: user.email };
    return {
      ...user,
      access_token: this.jwtService.sign(jwt),
    };
  }

  async register(body: UserDto) {
    const alreadyExist = await this.userService.findOneByEmail(body.email);

    if (alreadyExist) {
      return new BadRequestException('User already exist');
    }

    const user = await this.userService.create(body);

    const jwt = { sub: user.id, email: user.email };

    return {
      ...user,
      access_token: this.jwtService.sign(jwt),
    };
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: any = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
}
