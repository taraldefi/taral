import {MigrationInterface, QueryRunner} from "typeorm";

export class Suppliers1661877764916 implements MigrationInterface {
    name = 'Suppliers1661877764916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Suppliers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_595a2df92a697af43bb23c8c42b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Suppliers"`);
    }

}
