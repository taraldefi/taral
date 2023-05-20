import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTokenIsOptional1684575888819 implements MigrationInterface {
  name = 'UserTokenIsOptional1684575888819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "token" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "token" SET NOT NULL`,
    );
  }
}
