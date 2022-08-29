import {MigrationInterface, QueryRunner} from "typeorm";

export class Financials1661786914591 implements MigrationInterface {
    name = 'Financials1661786914591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying NOT NULL, "dateEstablished" TIMESTAMP WITH TIME ZONE NOT NULL, "employeeCount" integer NOT NULL, "taxNumber" character varying NOT NULL, "registrationNumbers" character varying NOT NULL, "addressId" uuid, CONSTRAINT "REL_caaf3ac6fe63463f50c99c6d0b" UNIQUE ("addressId"), CONSTRAINT "PK_999ff985663bc48d13b08bce475" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CompanyAddresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying NOT NULL, "addressLine1" character varying NOT NULL, "addressLine2" character varying NOT NULL, "postalCode" character varying NOT NULL, CONSTRAINT "PK_0313dfd6528659ba1917a92d5d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "FinancialInformations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "turnover" numeric(10,2) NOT NULL DEFAULT '0', "balanceSheetTotal" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_1bcb62b7d7160ecbeb13ccca57d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD CONSTRAINT "FK_caaf3ac6fe63463f50c99c6d0bb" FOREIGN KEY ("addressId") REFERENCES "CompanyAddresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Companies" DROP CONSTRAINT "FK_caaf3ac6fe63463f50c99c6d0bb"`);
        await queryRunner.query(`DROP TABLE "FinancialInformations"`);
        await queryRunner.query(`DROP TABLE "CompanyAddresses"`);
        await queryRunner.query(`DROP TABLE "Companies"`);
    }

}
