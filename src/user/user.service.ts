import { UserDto } from './dto/user.dto';
import { User } from 'src/user/user.entity';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserRepository } from './user.repository';

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

  async create(user: UserDto): Promise<User> {
    const createdUser = await this.userRepository.create(user);
    return this.userRepository.save(createdUser);
  }

  async delete(id: string): Promise<User[]> {
    await this.userRepository.delete(id);
    return this.findAll();
  }
}
