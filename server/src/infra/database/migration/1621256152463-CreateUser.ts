import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUser1621256152463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '250',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'password',
            type: 'varchar',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
