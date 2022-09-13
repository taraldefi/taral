import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sectors1661877146289 implements MigrationInterface {
  name = 'Sectors1661877146289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."Sectors_type_enum" AS ENUM('unknown', 'public', 'private')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."Sectors_status_enum" AS ENUM('unknown', 'subsidiary', 'independent')`,
    );
    await queryRunner.query(
      `CREATE TABLE "Sectors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "industryType" character varying NOT NULL, "type" "public"."Sectors_type_enum" NOT NULL DEFAULT 'unknown', "status" "public"."Sectors_status_enum" NOT NULL DEFAULT 'unknown', CONSTRAINT "PK_ad2730b7f1790d06da70779326c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Sectors"`);
    await queryRunner.query(`DROP TYPE "public"."Sectors_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."Sectors_type_enum"`);
  }
}
