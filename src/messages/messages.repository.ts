import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Messages } from 'src/shared/entities/messages.entity';

@EntityRepository(Messages)
export class MessagesRepository extends Repository<Messages> {
  constructor(
    @InjectRepository(Messages)
    public readonly repository: Repository<Messages>,
  ) {
    super();
  }
}
