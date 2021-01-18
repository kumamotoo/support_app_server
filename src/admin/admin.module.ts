import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, AdminRepository])],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
