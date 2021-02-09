import { Injectable } from '@nestjs/common';
import { Connection, Like } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserDto } from 'src/shared/dto/user.dto';
import { User } from 'src/shared/entities/user.entity';
import { getHashedPassword, getQueryValue } from 'src/shared/helpers';

@Injectable()
export class UserService {
  private readonly userRepository: UserRepository;

  constructor(private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async findWithQueries(query: any): Promise<User[]> {
    const { option, value } = getQueryValue(query?.search);
    return this.userRepository.find({
      where: {
        [option]: Like(`%${value}%`),
      },
    });
  }

  async create(user: UserDto): Promise<User> {
    const hashedPassword = await getHashedPassword(user.password);
    const createdUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    return this.userRepository.save(createdUser);
  }

  async delete(id: string): Promise<User[]> {
    await this.userRepository.delete(id);
    return this.findAll();
  }

  async update(id: string, body: any): Promise<any> {
    if (body.password) {
      body.password = await getHashedPassword(body.password);
    }
    return this.userRepository.update(id, body);
  }
}
