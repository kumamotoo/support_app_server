import { Room } from 'src/room/room.entity';
import { Connection } from 'typeorm';
import { MessagesRepository } from './messages.repository';
import { Injectable } from '@nestjs/common';
import { Messages } from './messages.entity';

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

  async getMessages(): Promise<Messages[]> {
    return this.messagesRepository.find({
      relations: ['room'],
    });
  }

  async createMessage(message: MessagesI): Promise<Messages> {
    const createdMessage = this.messagesRepository.create(message);
    return this.messagesRepository.save(createdMessage);
  }
}
