import { UserController } from './../user/user.controller';
import { AdminService } from './../admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { Request } from 'src/shared/entities/request.entity';
import { RequestRepository } from './request.repository';
import { RequestsController } from './requests.controller';
import { UserService } from 'src/user/user.service';
import { AdminController } from 'src/admin/admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Request, RequestRepository])],
  providers: [
    RequestsService,
    UserController,
    AdminController,
    UserService,
    AdminService,
  ],
  controllers: [RequestsController],
})
export class RequestsModule {}
