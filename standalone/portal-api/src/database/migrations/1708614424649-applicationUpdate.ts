import {MigrationInterface, QueryRunner} from "typeorm";

export class applicationUpdate1708614424649 implements MigrationInterface {
    name = 'applicationUpdate1708614424649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."QuickApplications_paymentmethod_enum" AS ENUM('CREDIT_CARD', 'CRYPTO')`);
        await queryRunner.query(`ALTER TABLE "QuickApplications" ADD "paymentMethod" "public"."QuickApplications_paymentmethod_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuickApplications" DROP COLUMN "paymentMethod"`);
        await queryRunner.query(`DROP TYPE "public"."QuickApplications_paymentmethod_enum"`);
    }

}
