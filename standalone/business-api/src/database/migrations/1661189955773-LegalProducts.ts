import {MigrationInterface, QueryRunner} from "typeorm";

export class LegalProducts1661189955773 implements MigrationInterface {
    name = 'LegalProducts1661189955773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "issuanceDate" TIMESTAMP WITH TIME ZONE NOT NULL, "maturityDate" TIMESTAMP WITH TIME ZONE NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "legal-entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "beneficialOwner" character varying NOT NULL, "abbreviation" character varying NOT NULL, "nationality" character varying NOT NULL, "headquaters" character varying NOT NULL, "industryType" character varying NOT NULL, "coreBusiness" character varying NOT NULL, "incorporationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "legalForm" character varying NOT NULL, CONSTRAINT "PK_675e4b60aefb4cbab6912c64db0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "legal-entity"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
