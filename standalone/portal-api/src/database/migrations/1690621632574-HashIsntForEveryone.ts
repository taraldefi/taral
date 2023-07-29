import {MigrationInterface, QueryRunner} from "typeorm";

export class HashIsntForEveryone1690621632574 implements MigrationInterface {
    name = 'HashIsntForEveryone1690621632574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "rolea" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "email_templates" DROP COLUMN "hash"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_templates" ADD "hash" character(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "hash" character(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rolea" ADD "hash" character(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "hash" character(64) NOT NULL`);
    }

}
