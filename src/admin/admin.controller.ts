import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from 'src/shared/dto/admin.dto';
import { Admin } from 'src/shared/entities/admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Post()
  async create(@Body() admin: AdminDto): Promise<Admin> {
    return this.adminService.create(admin);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Admin[]> {
    return this.adminService.delete(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: any): Promise<any> {
    return this.adminService.update(id, body);
  }
}
