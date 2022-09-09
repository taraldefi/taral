import {MigrationInterface, QueryRunner} from "typeorm";

export class LinkSupplierFinancials1661877989648 implements MigrationInterface {
    name = 'LinkSupplierFinancials1661877989648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD "financialsId" uuid`);
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD CONSTRAINT "UQ_fcc62eefa3e8f3ca06de68ecd72" UNIQUE ("financialsId")`);
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD CONSTRAINT "FK_fcc62eefa3e8f3ca06de68ecd72" FOREIGN KEY ("financialsId") REFERENCES "FinancialInformations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP CONSTRAINT "FK_fcc62eefa3e8f3ca06de68ecd72"`);
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP CONSTRAINT "UQ_fcc62eefa3e8f3ca06de68ecd72"`);
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP COLUMN "financialsId"`);
    }

}
