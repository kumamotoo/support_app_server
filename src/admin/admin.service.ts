import { AdminRepository } from './admin.repository';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AdminDto } from 'src/shared/dto/admin.dto';
import { Admin } from 'src/shared/entities/admin.entity';
import { getHashedPassword } from 'src/shared/helpers';

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

  async findOneByEmail(email: string): Promise<Admin> {
    return this.adminRepository.findOne({ email });
  }

  async create(admin: AdminDto): Promise<Admin> {
    const hashedPassword = await getHashedPassword(admin.password);
    const createdAdmin = await this.adminRepository.create({
      ...admin,
      password: hashedPassword,
    });
    return this.adminRepository.save(createdAdmin);
  }

  async delete(id: string): Promise<Admin[]> {
    await this.adminRepository.delete(id);
    return this.findAll();
  }

  async update(id: string, body: any): Promise<any> {
    if (body.password) {
      body.password = await getHashedPassword(body.password);
    }
    return this.adminRepository.update(id, body);
  }
}
