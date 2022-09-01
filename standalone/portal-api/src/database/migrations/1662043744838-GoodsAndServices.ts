import {MigrationInterface, QueryRunner} from "typeorm";

export class GoodsAndServices1662043744838 implements MigrationInterface {
    name = 'GoodsAndServices1662043744838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "capitalGoods" boolean NOT NULL, "service" character varying NOT NULL, "serviceDescription" character varying NOT NULL, CONSTRAINT "PK_811d1dc4e17047c8aee4454b968" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Services"`);
    }

}
