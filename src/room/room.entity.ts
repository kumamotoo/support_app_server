import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { User } from '../user/user.entity';
import { Messages } from './../messages/messages.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'open', default: true })
  open: boolean;

  @OneToMany(() => Messages, (message) => message.room)
  public messages: Messages[];

  @ManyToOne(() => User, (user) => user.room)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Admin, (admin) => admin.room)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;
}
