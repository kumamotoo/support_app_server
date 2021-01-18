import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user/user.controller';
import { AdminService } from './admin/admin.service';
import { RoomService } from './room/room.service';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { AdminModule } from './admin/admin.module';
import { MessagesModule } from './messages/messages.module';
import { Room } from './room/room.entity';
import { User } from './user/user.entity';
import { Admin } from './admin/admin.entity';
import { Messages } from './messages/messages.entity';

const {
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  // TYPEORM_ENTITIES_PATH,
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
      // entities: [join(__dirname, TYPEORM_ENTITIES_PATH)],
      entities: [Room, User, Admin, Messages],
      synchronize: true,
      logging: ['error'],
    }),
    UserModule,
    RoomModule,
    AdminModule,
    MessagesModule,
  ],
  controllers: [UserController],
  providers: [RoomService, AdminService],
})
export class AppModule {}
