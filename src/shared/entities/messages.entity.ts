import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from 'src/shared/entities/room.entity';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'message' })
  message: string;

  @Column({ name: 'sender', nullable: false })
  sender: string;

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
}
