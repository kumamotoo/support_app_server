import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { Room } from 'src/shared/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomRepository])],
  providers: [RoomService],
  controllers: [RoomController],
  // exports: [RoomController],
})
export class RoomModule {}
