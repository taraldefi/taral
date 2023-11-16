import { MigrationInterface, QueryRunner } from 'typeorm';

export class flagVariables1698747305127 implements MigrationInterface {
  name = 'flagVariables1698747305127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" DROP COLUMN "interestRegressiveRate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ADD "interestDegressiveRate" numeric(10,2) DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ALTER COLUMN "interestCurrency" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ALTER COLUMN "interestPercentage" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ALTER COLUMN "interestFixedRate" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ALTER COLUMN "interestFixedRate" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ALTER COLUMN "interestPercentage" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ALTER COLUMN "interestCurrency" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" DROP COLUMN "interestDegressiveRate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ADD "interestRegressiveRate" numeric(10,2) NOT NULL DEFAULT '0'`,
    );
  }
}
