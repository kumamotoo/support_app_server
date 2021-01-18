import { Body, Controller, Param, Post, Get, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { AdminDto } from './dto/admin.dto';

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
}
