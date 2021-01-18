import { Room } from 'src/room/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './dto/user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ length: 254, nullable: false, unique: true })
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Room, (room) => room.user)
  public room: Room[];

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: string;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: string;
}
