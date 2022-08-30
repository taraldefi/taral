import {MigrationInterface, QueryRunner} from "typeorm";

export class FinancialsSupplierInheritance1661878828000 implements MigrationInterface {
    name = 'FinancialsSupplierInheritance1661878828000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FinancialInformations" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_add7fce755d3af211905a03b39" ON "FinancialInformations" ("type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_add7fce755d3af211905a03b39"`);
        await queryRunner.query(`ALTER TABLE "FinancialInformations" DROP COLUMN "type"`);
    }

}
