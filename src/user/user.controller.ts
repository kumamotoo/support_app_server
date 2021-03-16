import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserDto } from 'src/shared/dto/user.dto';
import { User } from 'src/shared/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  find(@Req() req?: Request | undefined): Promise<User[]> {
    if (req?.query.search) {
      return this.userService.findWithQueries(req?.query);
    }
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

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: any): Promise<any> {
    return await this.userService.update(id, body);
  }
}
