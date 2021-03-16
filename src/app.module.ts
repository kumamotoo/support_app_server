import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { UserController } from './user/user.controller';
import { MessagesController } from './messages/messages.controller';

import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { RequestsModule } from './requests/requests.module';

import { RoomService } from './room/room.service';
import { UserService } from './user/user.service';

import { AppGateway } from './shared/app.gateway';

const {
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_ENTITIES_PATH,
  TYPEORM_CONNECTION,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPEORM_CONNECTION as 'postgres',
      host: TYPEORM_HOST,
      port: +TYPEORM_PORT,
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      entities: [join(__dirname, TYPEORM_ENTITIES_PATH)],
      synchronize: true,
      logging: ['error'],
    }),
    UserModule,
    RoomModule,
    MessagesModule,
    AuthModule,
    RequestsModule,
  ],
  controllers: [UserController],
  providers: [RoomService, UserService, AppGateway, MessagesController],
})
export class AppModule {}
