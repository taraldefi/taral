import {MigrationInterface, QueryRunner} from "typeorm";

export class companyTableChanges1708878286294 implements MigrationInterface {
    name = 'companyTableChanges1708878286294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CompanyInformation" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" ADD "stripeId" character varying`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" ADD "stripeId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" DROP COLUMN "stripeId"`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" DROP COLUMN "stripeId"`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "CompanyInformation" ADD "email" character varying`);
    }

}
