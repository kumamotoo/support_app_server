import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initMessages1610794497508 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('messages');
    await queryRunner.dropForeignKeys('messages', table.foreignKeys);
    await queryRunner.dropTable('messages');
  }
}
