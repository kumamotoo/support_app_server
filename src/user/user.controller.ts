import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() user: UserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<User[]> {
    return this.userService.delete(id);
  }
}
