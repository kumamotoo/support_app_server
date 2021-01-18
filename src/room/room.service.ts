import { RoomDto } from './dto/room.dto';
import { RoomRepository } from './room.repository';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  private readonly roomRepository: RoomRepository;

  constructor(private readonly connection: Connection) {
    this.roomRepository = this.connection.getCustomRepository(RoomRepository);
  }

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.find({
      relations: ['user', 'admin', 'messages'],
    });
  }

  async createRoom(room: RoomDto): Promise<any> {
    const createdRoom = this.roomRepository.create(room);
    return this.roomRepository.save(createdRoom);
  }

  async getRoom(id: string): Promise<Room> {
    return this.roomRepository.findOne(id, {
      relations: ['user', 'admin', 'messages'],
    });
  }

  async deleteRoom(id: string) {
    await this.roomRepository.delete(id);
    return this.getAllRooms();
  }
}
