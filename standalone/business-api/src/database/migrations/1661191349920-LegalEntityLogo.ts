import {MigrationInterface, QueryRunner} from "typeorm";

export class LegalEntityLogo1661191349920 implements MigrationInterface {
    name = 'LegalEntityLogo1661191349920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "issuanceDate" TIMESTAMP WITH TIME ZONE NOT NULL, "maturityDate" TIMESTAMP WITH TIME ZONE NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "legalEntityId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "legal-entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "beneficialOwner" character varying NOT NULL, "abbreviation" character varying NOT NULL, "nationality" character varying NOT NULL, "headquaters" character varying NOT NULL, "industryType" character varying NOT NULL, "coreBusiness" character varying NOT NULL, "incorporationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "legalForm" character varying NOT NULL, "logo" character varying NOT NULL, CONSTRAINT "PK_675e4b60aefb4cbab6912c64db0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "issuanceDate" TIMESTAMP WITH TIME ZONE NOT NULL, "legalEntityId" uuid, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_23b9f864ea15307ea743e754705" FOREIGN KEY ("legalEntityId") REFERENCES "legal-entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_a7a3c33f6ec1c830ef246f9dd60" FOREIGN KEY ("legalEntityId") REFERENCES "legal-entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_a7a3c33f6ec1c830ef246f9dd60"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_23b9f864ea15307ea743e754705"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TABLE "legal-entity"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
