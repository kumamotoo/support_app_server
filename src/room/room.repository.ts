import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  constructor(
    @InjectRepository(Room) public readonly repository: Repository<Room>,
  ) {
    super();
  }
}
