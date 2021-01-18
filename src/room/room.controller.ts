import { RoomService } from './room.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoomDto } from './dto/room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  getAllRooms(): any {
    return this.roomService.getAllRooms();
  }

  @Get('/:id')
  getRoomById(@Param('id') id: string): any {
    return this.roomService.getRoom(id);
  }

  @Post()
  createRoom(@Body() room: RoomDto) {
    return this.roomService.createRoom(room);
  }

  @Delete('/:id')
  deleteRoom(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }
}
