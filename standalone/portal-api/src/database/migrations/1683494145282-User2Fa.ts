import { MigrationInterface, QueryRunner } from "typeorm";

export class User2Fa1683494145282 implements MigrationInterface {
    name = 'User2Fa1683494145282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "twoFA_secret" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "twoFA_enabled" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twoFA_enabled"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twoFA_secret"`);
    }

}
