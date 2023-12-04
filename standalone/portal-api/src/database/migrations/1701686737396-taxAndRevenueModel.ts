import {MigrationInterface, QueryRunner} from "typeorm";

export class taxAndRevenueModel1701686737396 implements MigrationInterface {
    name = 'taxAndRevenueModel1701686737396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TaxAndRevenue" DROP CONSTRAINT "FK_d682227c929d4023ec7c9610e25"`);
        await queryRunner.query(`ALTER TABLE "TaxAndRevenue" RENAME COLUMN "companyId" TO "companyInformationId"`);
        await queryRunner.query(`ALTER TABLE "TaxAndRevenue" ADD CONSTRAINT "FK_4120184f699951fbe7cccc2a271" FOREIGN KEY ("companyInformationId") REFERENCES "CompanyInformation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TaxAndRevenue" DROP CONSTRAINT "FK_4120184f699951fbe7cccc2a271"`);
        await queryRunner.query(`ALTER TABLE "TaxAndRevenue" RENAME COLUMN "companyInformationId" TO "companyId"`);
        await queryRunner.query(`ALTER TABLE "TaxAndRevenue" ADD CONSTRAINT "FK_d682227c929d4023ec7c9610e25" FOREIGN KEY ("companyId") REFERENCES "CompanyInformation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
