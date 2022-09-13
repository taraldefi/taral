import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkTransactionAndContract1662044691199
  implements MigrationInterface
{
  name = 'LinkTransactionAndContract1662044691199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "conoclusion" TIMESTAMP WITH TIME ZONE NOT NULL, "isSigned" boolean NOT NULL, CONSTRAINT "PK_4f88addbb8b532d6e46459c8755" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "Transactions" ADD "contractId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "Transactions" ADD CONSTRAINT "UQ_e1accc56c67658990c6a1bfed8c" UNIQUE ("contractId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" ADD CONSTRAINT "FK_e1accc56c67658990c6a1bfed8c" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Transactions" DROP CONSTRAINT "FK_e1accc56c67658990c6a1bfed8c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" DROP CONSTRAINT "UQ_e1accc56c67658990c6a1bfed8c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" DROP COLUMN "contractId"`,
    );
    await queryRunner.query(`DROP TABLE "Contracts"`);
  }
}
