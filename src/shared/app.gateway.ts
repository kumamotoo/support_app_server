import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { SEND_MESSAGE, NEW_MESSAGE } from './constants';
import { MessagesController } from './../messages/messages.controller';
import { MessagesI } from 'src/messages/messages.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  wsClients = [];
  private logger: Logger = new Logger('AppGateway');
  constructor(private messagesController: MessagesController) {}

  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (const client of this.wsClients) {
      client.emit(event, broadCastMessage);
    }
  }

  @SubscribeMessage(SEND_MESSAGE)
  async handleMessage(client: Socket, @MessageBody() message: MessagesI) {
    const createdMessage = await this.messagesController.create(message);
    this.broadcast(NEW_MESSAGE, createdMessage);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket, ...args: any[]) {
    this.wsClients.push(client);
    this.logger.log(`Client connected: ${client.id}`);
  }
}
