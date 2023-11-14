import { MigrationInterface, QueryRunner } from 'typeorm';

export class downpaymentUpdate1699293291057 implements MigrationInterface {
  name = 'downpaymentUpdate1699293291057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ADD "downpaymentCurrency" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ADD "downpaymentAmount" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ADD "downpaymentDescription" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ADD "balanceCurrency" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ADD "balanceAmount" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ADD "balancePaymentDeadline" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" ADD "paymentVehicleDescription" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" DROP COLUMN "paymentVehicleDescription"`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" DROP COLUMN "balancePaymentDeadline"`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" DROP COLUMN "balanceAmount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" DROP COLUMN "balanceCurrency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" DROP COLUMN "downpaymentDescription"`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" DROP COLUMN "downpaymentAmount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "PaymentTerms" DROP COLUMN "downpaymentCurrency"`,
    );
  }
}
