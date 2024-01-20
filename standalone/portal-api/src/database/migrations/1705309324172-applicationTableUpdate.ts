import {MigrationInterface, QueryRunner} from "typeorm";

export class applicationTableUpdate1705309324172 implements MigrationInterface {
    name = 'applicationTableUpdate1705309324172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuickApplications" DROP COLUMN "purchaseOrderId"`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" ADD "purchaseOrderId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuickApplications" DROP COLUMN "purchaseOrderId"`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" ADD "purchaseOrderId" integer`);
    }

}
