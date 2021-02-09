import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from './admin.entity';

import { Messages } from './messages.entity';
import { User } from './user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'open', default: true })
  open: boolean;

  @Column({ name: 'resolved', default: false })
  resolved: boolean;

  @OneToMany(() => Messages, (message) => message.room)
  public messages: Messages[];

  @ManyToOne(() => User, (user) => user.room)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Admin, (admin) => admin.room)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: string;
}
