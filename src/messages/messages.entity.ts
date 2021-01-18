import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Room } from 'src/room/room.entity';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  // "messages": "{\"{sender: '123',content: '12345'}, {sender: '123',content: '12345'}\"}",
  @Column('text', { name: 'message', array: true, default: '{}' })
  messages: string[];

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
