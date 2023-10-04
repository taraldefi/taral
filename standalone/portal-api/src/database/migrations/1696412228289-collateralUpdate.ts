import {MigrationInterface, QueryRunner} from "typeorm";

export class collateralUpdate1696412228289 implements MigrationInterface {
    name = 'collateralUpdate1696412228289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TransactionDocuments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_8488f8e87bde7dacf065cec4cbb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file" ADD "transactionDocumentsId" uuid`);
        await queryRunner.query(`ALTER TABLE "Collaterals" DROP COLUMN "financingRatio"`);
        await queryRunner.query(`ALTER TABLE "Collaterals" ADD "financingRatio" numeric(2,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Collaterals" DROP COLUMN "facilityAmount"`);
        await queryRunner.query(`ALTER TABLE "Collaterals" ADD "facilityAmount" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_88977868473a43cee536dd81126" FOREIGN KEY ("transactionDocumentsId") REFERENCES "TransactionDocuments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_88977868473a43cee536dd81126"`);
        await queryRunner.query(`ALTER TABLE "Collaterals" DROP COLUMN "facilityAmount"`);
        await queryRunner.query(`ALTER TABLE "Collaterals" ADD "facilityAmount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Collaterals" DROP COLUMN "financingRatio"`);
        await queryRunner.query(`ALTER TABLE "Collaterals" ADD "financingRatio" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "transactionDocumentsId"`);
        await queryRunner.query(`DROP TABLE "TransactionDocuments"`);
    }

}
