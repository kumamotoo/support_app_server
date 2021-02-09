import { Connection } from 'typeorm';
import { MessagesRepository } from './messages.repository';
import { Injectable } from '@nestjs/common';
import { Messages } from 'src/shared/entities/messages.entity';
import { Room } from 'src/shared/entities/room.entity';

export interface MessagesI {
  id?: any;
  messages: any;
  admin: string;
  room: Room;
}

@Injectable()
export class MessagesService {
  private readonly messagesRepository: MessagesRepository;

  constructor(private readonly connection: Connection) {
    this.messagesRepository = this.connection.getCustomRepository(
      MessagesRepository,
    );
  }

  async find(): Promise<Messages[]> {
    return this.messagesRepository.find({
      relations: ['room'],
    });
  }

  async create(message: MessagesI): Promise<Messages> {
    const createdMessage = this.messagesRepository.create(message);
    return this.messagesRepository.save(createdMessage);
  }
}
