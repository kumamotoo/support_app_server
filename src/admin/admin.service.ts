import { AdminDto } from './dto/admin.dto';
import { AdminRepository } from './admin.repository';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  private readonly adminRepository: AdminRepository;

  constructor(private readonly connection: Connection) {
    this.adminRepository = this.connection.getCustomRepository(AdminRepository);
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: string): Promise<Admin> {
    return this.adminRepository.findOne(id);
  }

  async create(admin: AdminDto): Promise<Admin> {
    const createdAdmin = await this.adminRepository.create(admin);
    return this.adminRepository.save(createdAdmin);
  }

  async delete(id: string): Promise<Admin[]> {
    await this.adminRepository.delete(id);
    return this.findAll();
  }
}
