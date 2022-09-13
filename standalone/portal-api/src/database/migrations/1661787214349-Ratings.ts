import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ratings1661787214349 implements MigrationInterface {
  name = 'Ratings1661787214349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ExternalRatings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" numeric(10,2) NOT NULL DEFAULT '0', "agencyName" character varying NOT NULL, "issuanceDate" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_ed46faaa474dff253119c20bc64" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ExternalRatings"`);
  }
}
