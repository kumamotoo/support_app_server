import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) public readonly repository: Repository<User>,
  ) {
    super();
  }
}
