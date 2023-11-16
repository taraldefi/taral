import { MigrationInterface, QueryRunner } from 'typeorm';

export class applicationChanges1699335926653 implements MigrationInterface {
  name = 'applicationChanges1699335926653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" ADD "applicationNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" ADD CONSTRAINT "UQ_20e7a0b240ff08a04a87325d36a" UNIQUE ("applicationNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" ADD "endDate" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" DROP COLUMN "endDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" DROP CONSTRAINT "UQ_20e7a0b240ff08a04a87325d36a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" DROP COLUMN "applicationNumber"`,
    );
  }
}
