import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { Messages } from './messages.entity';
import { MessagesController } from './messages.controller';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Messages, MessagesRepository])],
  providers: [MessagesService, MessagesGateway],
  controllers: [MessagesController],
})
export class MessagesModule {}
