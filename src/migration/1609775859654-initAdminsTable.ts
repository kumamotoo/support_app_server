import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Role } from '../user/dto/user.dto';

export class initAdminsTable1609775859654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admin',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            length: '254',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar',
            default: "'admin'",
            enum: [Role.SUPER_ADMIN, Role.ADMIN, Role.USER],
            isNullable: false,
          },
          {
            name: 'roomId',
            type: 'uuid',
            isNullable: false,
          },
          {
            default: 'now()',
            name: 'createdAt',
            type: 'timestamp',
          },
          {
            default: 'now()',
            name: 'updatedAt',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['roomId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'room',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('admin');
    await queryRunner.dropForeignKeys('admin', table.foreignKeys);
    await queryRunner.dropTable('admin');
  }
}
