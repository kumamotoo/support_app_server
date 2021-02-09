import { RoomService } from './room.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { RoomDto } from 'src/shared/dto/room.dto';
import { Room } from 'src/shared/entities/room.entity';
import { Request } from 'express';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  //?sort=title=t
  @Get()
  find(@Req() req?: Request | undefined): any {
    if (req?.query.search || req?.query.sort) {
      return this.roomService.findWithQueries(req.query);
    }
    return this.roomService.find();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): any {
    return this.roomService.findOne(id);
  }

  @Post()
  create(@Body() room: RoomDto) {
    return this.roomService.create(room);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.roomService.delete(id);
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string): Promise<Room[]> {
    return this.roomService.findByUser(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: any): Promise<Room> {
    return this.roomService.update(id, body);
  }
}
