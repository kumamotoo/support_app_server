import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/shared/entities/admin.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  constructor(
    @InjectRepository(Admin) public readonly repository: Repository<Admin>,
  ) {
    super();
  }
}
