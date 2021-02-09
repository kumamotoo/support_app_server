import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Request } from 'src/shared/entities/request.entity';

@EntityRepository(Request)
export class RequestRepository extends Repository<Request> {
  constructor(
    @InjectRepository(Request) public readonly repository: Repository<Request>,
  ) {
    super();
  }
}
