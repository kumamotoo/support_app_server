import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { UserController } from './user/user.controller';
import { MessagesController } from './messages/messages.controller';
import { AdminService } from './admin/admin.service';
import { RoomService } from './room/room.service';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { AdminModule } from './admin/admin.module';
import { MessagesModule } from './messages/messages.module';
import { AppGateway } from './shared/app.gateway';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { RequestsModule } from './requests/requests.module';
import { AdminController } from './admin/admin.controller';

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
    AdminModule,
    MessagesModule,
    AuthModule,
    RequestsModule,
  ],
  controllers: [UserController],
  providers: [
    RoomService,
    AdminService,
    UserService,
    AppGateway,
    MessagesController,
    // UserController,
    AdminController,
  ],
})
export class AppModule {}
