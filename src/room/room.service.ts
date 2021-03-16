import { RoomRepository } from './room.repository';
import { Injectable } from '@nestjs/common';
import { Connection, Like } from 'typeorm';
import { RoomDto } from 'src/shared/dto/room.dto';
import { Room } from 'src/shared/entities/room.entity';
import { getQueryValue } from 'src/shared/helpers';

@Injectable()
export class RoomService {
  private readonly roomRepository: RoomRepository;

  constructor(private readonly connection: Connection) {
    this.roomRepository = this.connection.getCustomRepository(RoomRepository);
  }

  async find(): Promise<Room[]> {
    return this.roomRepository.find({
      relations: ['user', 'messages'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findWithQueries(query: any): Promise<Room[]> {
    let order = {};
    let where = {};

    if (query.sort) {
      const { option, value } = getQueryValue(query?.sort);
      order = {
        [option]: value,
      };
    }

    if (query.search) {
      const { option, value } = getQueryValue(query?.search);
      console.log(option, value);

      where = {
        [option]: Like(`%${value}%`),
      };
    }

    return this.roomRepository.find({
      relations: ['user', 'messages'],
      where,
      order,
    });
  }

  async create(room: RoomDto): Promise<any> {
    const createdRoom = this.roomRepository.create(room);
    return this.roomRepository.save(createdRoom);
  }

  async findOne(id: string): Promise<Room> {
    return this.roomRepository.findOne(id, {
      relations: ['user', 'messages'],
    });
  }

  async findByUser(id: string): Promise<Room[]> {
    return this.roomRepository.find({
      where: { user: id },
      relations: ['user'],
    });
  }

  async delete(id: string) {
    await this.roomRepository.delete(id);
    return this.find();
  }

  async update(id: string, payload: any): Promise<Room> {
    await this.roomRepository.update(id, payload);
    return this.findOne(id);
  }
}
