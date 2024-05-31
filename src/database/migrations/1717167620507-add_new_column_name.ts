import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumnName1717167620507 implements MigrationInterface {
  name = 'AddNewColumnName1717167620507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "userName" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
  }
}
