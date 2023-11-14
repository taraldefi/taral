import {MigrationInterface, QueryRunner} from "typeorm";

export class quickAppplication1699937779675 implements MigrationInterface {
    name = 'quickAppplication1699937779675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_bc9a4014f3ada292b2409b17620"`);
        await queryRunner.query(`ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_c880a46a81d871b000f044e2f14"`);
        await queryRunner.query(`ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_c880a46a81d871b000f044e2f14" FOREIGN KEY ("buyerInformationId") REFERENCES "BuyerCompanies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_bc9a4014f3ada292b2409b17620" FOREIGN KEY ("supplierInformationId") REFERENCES "SupplierCompanies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_bc9a4014f3ada292b2409b17620"`);
        await queryRunner.query(`ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_c880a46a81d871b000f044e2f14"`);
        await queryRunner.query(`ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_c880a46a81d871b000f044e2f14" FOREIGN KEY ("buyerInformationId") REFERENCES "CompanyInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_bc9a4014f3ada292b2409b17620" FOREIGN KEY ("supplierInformationId") REFERENCES "CompanyInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
