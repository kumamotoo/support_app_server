import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/shared/entities/room.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  constructor(
    @InjectRepository(Room) public readonly repository: Repository<Room>,
  ) {
    super();
  }
}
