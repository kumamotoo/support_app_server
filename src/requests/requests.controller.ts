import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'src/shared/entities/request.entity';
import { Request as Requests } from 'express';
import { RequestDto } from './../shared/dto/request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Post()
  create(@Body() request: RequestDto): Promise<Request> {
    return this.requestsService.create(request);
  }

  @Get()
  find(@Req() req?: Requests | undefined): any {
    if (req?.query.sort || req?.query.search) {
      return this.requestsService.findWithQueries(req?.query);
    }
    return this.requestsService.find();
  }

  @Get('/:id')
  findOne(@Param() id: string): Promise<Request> {
    return this.requestsService.findOne(id);
  }

  @Get('/user/:id')
  findByUser(@Param() id: string): Promise<Request[]> {
    return this.requestsService.findByUser(id);
  }

  @Delete('/:id')
  delete(@Param() id: string): Promise<Request[]> {
    this.requestsService.delete(id);
    return this.find();
  }
}
