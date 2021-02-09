import { MessagesService, MessagesI } from './messages.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  find(): any {
    return this.messagesService.find();
  }

  @Post()
  create(@Body() message: MessagesI) {
    return this.messagesService.create(message);
  }
}
