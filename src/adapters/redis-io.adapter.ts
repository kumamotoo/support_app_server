import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

const { REDIS_HOST, REDIS_PORT } = process.env;

export class RedisIoAdapter extends IoAdapter {
  public createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);

    const redisAdapter = redisIoAdapter({
      host: REDIS_HOST,
      port: +REDIS_PORT,
    });

    server.adapter(redisAdapter);

    server.of('/').adapter.customHook = (
      userId: string,
      callback: (socketIds?: string[]) => void,
    ) => {
      callback(
        Object.keys(server.sockets.connected)
          .map((key) => server.sockets.connected[key])
          .filter((x) => x.token.id === userId)
          .map((x) => x.id),
      );
    };
    return server;
  }
}
