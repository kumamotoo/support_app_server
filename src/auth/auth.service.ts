import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminDto } from 'src/shared/dto/admin.dto';
import { Role, UserDto } from 'src/shared/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AdminService } from './../admin/admin.service';
import { isPasswordMatched } from './../shared/helpers';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate({ email, password }): Promise<any> {
    let person;
    person = await this.userService.findOneByEmail(email);
    if (!person) {
      person = await this.adminService.findOneByEmail(email);
    }

    if (!person) {
      throw new BadRequestException('Wrong credentials.');
    }

    const passwordMatched = await isPasswordMatched(password, person.password);

    if (person && passwordMatched) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = person;
      return result;
    }
    throw new BadRequestException('Wrong credentials.');
  }

  async login(body: UserDto | AdminDto) {
    const person = await this.validate(body);

    if (!person) {
      throw new BadRequestException('Wrong credentials.');
    }

    const jwt = { sub: person.id, email: person.email };
    return {
      ...person,
      access_token: this.jwtService.sign(jwt),
    };
  }

  async register(body: UserDto | AdminDto) {
    let person;

    const alreadyExist =
      (await this.userService.findOneByEmail(body.email)) ||
      (await this.adminService.findOneByEmail(body.email));

    if (alreadyExist) {
      return new BadRequestException('User already exist');
    }

    if (body.role && body.role !== Role.USER) {
      person = await this.adminService.create(body);
    } else {
      person = await this.userService.create(body);
    }

    const jwt = { sub: person.id, email: person.email };
    console.log(person);

    return {
      ...person,
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
