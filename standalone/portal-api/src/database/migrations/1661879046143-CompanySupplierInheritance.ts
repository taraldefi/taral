import { MigrationInterface, QueryRunner } from 'typeorm';

export class CompanySupplierInheritance1661879046143
  implements MigrationInterface
{
  name = 'CompanySupplierInheritance1661879046143';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Companies" ADD "type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_abd3a77683d5179383b9d4d64a" ON "Companies" ("type") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_abd3a77683d5179383b9d4d64a"`,
    );
    await queryRunner.query(`ALTER TABLE "Companies" DROP COLUMN "type"`);
  }
}
