import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCollateralEntity1698847549376 implements MigrationInterface {
    name = 'updateCollateralEntity1698847549376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Collaterals" ALTER COLUMN "collateralProviderInfluence" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Collaterals" ALTER COLUMN "collateralProviderExperience" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Collaterals" ALTER COLUMN "collateralProviderExperience" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Collaterals" ALTER COLUMN "collateralProviderInfluence" SET NOT NULL`);
    }

}
