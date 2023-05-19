import {MigrationInterface, QueryRunner} from "typeorm";

export class OptionalLogo1684477301977 implements MigrationInterface {
    name = 'OptionalLogo1684477301977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "legal-entity" ALTER COLUMN "logo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "legal-entity" ALTER COLUMN "logo" SET NOT NULL`);
    }

}
