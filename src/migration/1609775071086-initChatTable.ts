import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initChatTable1609775071086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
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
            referencedTableName: 'admin',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('room');
    await queryRunner.dropForeignKeys('room', table.foreignKeys);
    await queryRunner.dropTable('room');
  }
}
