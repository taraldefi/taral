import {MigrationInterface, QueryRunner} from "typeorm";

export class LegalEntity1661185375819 implements MigrationInterface {
    name = 'LegalEntity1661185375819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "legal-entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "beneficialOwner" character varying NOT NULL, "abbreviation" character varying NOT NULL, "nationality" character varying NOT NULL, "headquaters" character varying NOT NULL, "industryType" character varying NOT NULL, "coreBusiness" character varying NOT NULL, "incorporationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "legalForm" character varying NOT NULL, CONSTRAINT "PK_675e4b60aefb4cbab6912c64db0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "legal-entity"`);
    }

}
