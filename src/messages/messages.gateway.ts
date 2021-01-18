import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagesI, MessagesService } from './messages.service';

@WebSocketGateway({
  origins: 'http://localhost:4200',
})
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('SEND_MESSAGE')
  public async sendMessage(io: Socket, data: MessagesI): Promise<MessagesI> {
    await this.messagesService.createMessage(data);
    return data;
  }

  // Using redis-io adapter custom hook/request to reach connected sockets on all nodes
  // private async dispatchMessage(id: string, io: Socket, data: MessagesI) {
  //   (io.server.of('/').adapter as any).customRequest(
  //     (error: any, socketIds: any[]) => {
  //       if (error) {
  //         // tslint:disable-next-line:no-console
  //         console.log(error);
  //       }
  //     },
  //   );
  // }
}
