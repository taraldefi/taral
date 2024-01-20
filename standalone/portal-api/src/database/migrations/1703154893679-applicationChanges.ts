import {MigrationInterface, QueryRunner} from "typeorm";

export class applicationChanges1703154893679 implements MigrationInterface {
    name = 'applicationChanges1703154893679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" ADD "onchainPrincipal" character varying`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" ADD "onchainPrincipal" character varying`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" ADD "sellerPrincipal" character varying`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" ADD "purchaseOrderId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuickApplications" DROP COLUMN "purchaseOrderId"`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" DROP COLUMN "sellerPrincipal"`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" DROP COLUMN "onchainPrincipal"`);
        await queryRunner.query(`ALTER TABLE "SupplierCompanies" DROP COLUMN "onchainPrincipal"`);
    }

}
