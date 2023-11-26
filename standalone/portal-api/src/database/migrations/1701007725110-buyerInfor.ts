import {MigrationInterface, QueryRunner} from "typeorm";

export class buyerInfor1701007725110 implements MigrationInterface {
    name = 'buyerInfor1701007725110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuickApplications" ADD "buyerInformationId" uuid`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" ADD CONSTRAINT "UQ_f3c3b88e296d4f48588391c31cf" UNIQUE ("buyerInformationId")`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" ADD CONSTRAINT "FK_f3c3b88e296d4f48588391c31cf" FOREIGN KEY ("buyerInformationId") REFERENCES "CompanyInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuickApplications" DROP CONSTRAINT "FK_f3c3b88e296d4f48588391c31cf"`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" DROP CONSTRAINT "UQ_f3c3b88e296d4f48588391c31cf"`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" DROP COLUMN "buyerInformationId"`);
    }

}
