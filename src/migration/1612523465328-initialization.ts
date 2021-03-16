import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Role } from 'src/shared/dto/user.dto';

const { TYPEORM_DATABASE } = process.env;

export class initialization1612523465328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .createDatabase(TYPEORM_DATABASE, true)
      .then(() =>
        queryRunner.createTable(
          new Table({
            name: 'user',
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
                default: "'user'",
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
        ),
      )
      .then(() =>
        queryRunner.createTable(
          new Table({
            name: 'room',
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
                name: 'title',
                type: 'string',
                isNullable: true,
              },
              {
                name: 'description',
                type: 'string',
                isNullable: true,
              },
              {
                name: 'userId',
                type: 'uuid',
                isNullable: false,
              },
              {
                name: 'messagesId',
                type: 'uuid',
                isNullable: false,
              },
              {
                name: 'adminId',
                type: 'uuid',
                isNullable: false,
              },
              {
                name: 'open',
                type: 'boolean',
                isNullable: true,
                default: true,
              },
              {
                name: 'resolved',
                type: 'boolean',
                isNullable: true,
                default: false,
              },
              {
                name: 'createdAt',
                default: 'now()',
                type: 'timestamp',
              },
              {
                name: 'updatedAt',
                default: 'now()',
                type: 'timestamp',
              },
            ],
            foreignKeys: [
              {
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
              },
              {
                columnNames: ['messagesId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'messages',
              },
              {
                columnNames: ['adminId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
              },
            ],
          }),
        ),
      )
      .then(() =>
        queryRunner.createTable(
          new Table({
            name: 'request',
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
                name: 'title',
                type: 'string',
                isNullable: false,
              },
              {
                name: 'description',
                type: 'string',
                isNullable: false,
              },
              {
                name: 'creator',
                type: 'string',
                isNullable: false,
              },
              {
                name: 'createdAt',
                default: 'now()',
                type: 'timestamp',
              },
              {
                name: 'updatedAt',
                default: 'now()',
                type: 'timestamp',
              },
            ],
          }),
        ),
      )
      .then(() =>
        queryRunner.createTable(
          new Table({
            name: 'messages',
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
                name: 'messages',
                type: 'string',
                isNullable: true,
              },
              {
                name: 'sender',
                type: 'string',
                isNullable: false,
              },
              {
                name: 'roomId',
                type: 'uuid',
                isNullable: false,
              },
              {
                name: 'createdAt',
                default: 'now()',
                type: 'timestamp',
              },
              {
                name: 'updatedAt',
                default: 'now()',
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
        ),
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
