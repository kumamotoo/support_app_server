import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/shared/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, AdminRepository])],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
