import {MigrationInterface, QueryRunner} from "typeorm";

export class buyerAndSupplierCompanyInfo1699937151227 implements MigrationInterface {
    name = 'buyerAndSupplierCompanyInfo1699937151227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" ADD "companyInformationId" uuid`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" ADD CONSTRAINT "UQ_6c2f56b7f6034211a2330041834" UNIQUE ("companyInformationId")`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" ADD "companyInformationId" uuid`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" ADD CONSTRAINT "UQ_3f842c6b8708da37970bd70a14f" UNIQUE ("companyInformationId")`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" ADD CONSTRAINT "FK_6c2f56b7f6034211a2330041834" FOREIGN KEY ("companyInformationId") REFERENCES "CompanyInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" ADD CONSTRAINT "FK_3f842c6b8708da37970bd70a14f" FOREIGN KEY ("companyInformationId") REFERENCES "CompanyInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" DROP CONSTRAINT "FK_3f842c6b8708da37970bd70a14f"`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" DROP CONSTRAINT "FK_6c2f56b7f6034211a2330041834"`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" DROP CONSTRAINT "UQ_3f842c6b8708da37970bd70a14f"`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" DROP COLUMN "companyInformationId"`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" DROP CONSTRAINT "UQ_6c2f56b7f6034211a2330041834"`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" DROP COLUMN "companyInformationId"`);
    }

}
