import {MigrationInterface, QueryRunner} from "typeorm";

export class collateralChanges1712038229833 implements MigrationInterface {
    name = 'collateralChanges1712038229833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Collaterals" ALTER COLUMN "financingRatio" TYPE numeric(5,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Collaterals" ALTER COLUMN "financingRatio" TYPE numeric(2,2)`);
    }

}
