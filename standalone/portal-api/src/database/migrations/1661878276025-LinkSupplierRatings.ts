import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkSupplierRatings1661878276025 implements MigrationInterface {
  name = 'LinkSupplierRatings1661878276025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Suppliers" ADD "ratingId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "Suppliers" ADD CONSTRAINT "UQ_141b8ecc6c046ae0f68c9b8bb5f" UNIQUE ("ratingId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "Suppliers" ADD CONSTRAINT "FK_141b8ecc6c046ae0f68c9b8bb5f" FOREIGN KEY ("ratingId") REFERENCES "ExternalRatings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Suppliers" DROP CONSTRAINT "FK_141b8ecc6c046ae0f68c9b8bb5f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Suppliers" DROP CONSTRAINT "UQ_141b8ecc6c046ae0f68c9b8bb5f"`,
    );
    await queryRunner.query(`ALTER TABLE "Suppliers" DROP COLUMN "ratingId"`);
  }
}
