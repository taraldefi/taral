import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkTransactionGoods1662044058556 implements MigrationInterface {
  name = 'LinkTransactionGoods1662044058556';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "goodsAndServicesId" uuid, CONSTRAINT "REL_6a3743deaf73e36a0defcec115" UNIQUE ("goodsAndServicesId"), CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" ADD CONSTRAINT "FK_6a3743deaf73e36a0defcec1158" FOREIGN KEY ("goodsAndServicesId") REFERENCES "Services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Transactions" DROP CONSTRAINT "FK_6a3743deaf73e36a0defcec1158"`,
    );
    await queryRunner.query(`DROP TABLE "Transactions"`);
  }
}
