import { Room } from '../room/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/user/dto/user.dto';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ length: 254, nullable: false, unique: true })
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.ADMIN })
  role: Role;

  @OneToMany(() => Room, (room) => room.admin)
  public room: Room[];

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: string;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: string;
}
