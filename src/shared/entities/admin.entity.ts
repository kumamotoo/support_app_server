import { Room } from './room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/shared/dto/user.dto';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

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
