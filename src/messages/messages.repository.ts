import { Messages } from './messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Messages)
export class MessagesRepository extends Repository<Messages> {
  constructor(
    @InjectRepository(Messages)
    public readonly repository: Repository<Messages>,
  ) {
    super();
  }
}
