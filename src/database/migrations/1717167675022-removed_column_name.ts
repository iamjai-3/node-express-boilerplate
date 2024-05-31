import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedColumnName1717167675022 implements MigrationInterface {
  name = 'RemovedColumnName1717167675022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "userName" character varying NOT NULL`);
  }
}
