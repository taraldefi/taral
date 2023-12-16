import {MigrationInterface, QueryRunner} from "typeorm";

export class companyTableChanges1702558767431 implements MigrationInterface {
    name = 'companyTableChanges1702558767431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CompanyInformation" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "CompanyInformation" DROP COLUMN "registrationNumbers"`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" ADD "registrationNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" ADD "registrationNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" DROP COLUMN "registrationNumber"`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" DROP COLUMN "registrationNumber"`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "CompanyInformation" ADD "registrationNumbers" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "CompanyInformation" ADD "phoneNumber" character varying NOT NULL`);
    }

}
