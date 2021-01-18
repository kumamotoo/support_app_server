import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) public readonly repository: Repository<User>,
  ) {
    super();
  }
}
