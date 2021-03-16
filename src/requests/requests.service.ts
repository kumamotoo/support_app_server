import { UserController } from './../user/user.controller';
import { Injectable } from '@nestjs/common';
import { Request } from 'src/shared/entities/request.entity';
import { Connection, Like } from 'typeorm';
import { RequestRepository } from './request.repository';
import { RequestDto } from 'src/shared/dto/request.dto';
import { getQueryValue } from 'src/shared/helpers';

@Injectable()
export class RequestsService {
  private readonly requestRepository: RequestRepository;

  constructor(
    private readonly connection: Connection,
    private userController: UserController,
  ) {
    this.requestRepository = this.connection.getCustomRepository(
      RequestRepository,
    );
  }

  async create(data: RequestDto): Promise<any> {
    const request = this.requestRepository.create(data);
    return this.requestRepository.save(request);
  }

  async find(): Promise<Request[]> {
    return this.requestRepository.find();
  }

  async findWithQueries(query: any): Promise<Request[]> {
    let order = {};
    let where = {};

    if (query.sort) {
      const { option, value } = getQueryValue(query?.sort);
      order = {
        [option]: value,
      };
    }

    if (query.search) {
      const { option, value } = getQueryValue(query?.search);
      where = {
        [option]: Like(`%${value}%`),
      };
    }

    return this.requestRepository.find({
      where,
      order,
    });
  }

  async findOne(id: string): Promise<Request> {
    const info = await this.requestRepository.findOne(id);
    const { id: creator } = await this.findCreator(info.creator);
    return { ...info, creator };
  }

  async findByUser({ id }: any): Promise<Request[]> {
    return this.requestRepository.find({ where: { creator: id } });
  }

  async findCreator(id: string) {
    return await this.userController.findOne(id);
  }

  async delete(id: string) {
    await this.requestRepository.delete(id);
  }
}
