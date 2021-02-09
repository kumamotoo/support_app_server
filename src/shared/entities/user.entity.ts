import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from 'src/shared/entities/room.entity';
import { Role } from '../dto/user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

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
