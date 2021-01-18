import { MessagesService, MessagesI } from './messages.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  getMessage(): any {
    return this.messagesService.getMessages();
  }

  @Post()
  createMessage(@Body() message: MessagesI) {
    return this.messagesService.createMessage(message);
  }
}
