import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Admin } from './admin.entity';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  constructor(
    @InjectRepository(Admin) public readonly repository: Repository<Admin>,
  ) {
    super();
  }
}
