import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { MessagesController } from './messages.controller';
import { Messages } from 'src/shared/entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Messages, MessagesRepository])],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
