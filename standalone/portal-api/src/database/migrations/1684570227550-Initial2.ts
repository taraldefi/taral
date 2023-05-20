import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial21684570227550 implements MigrationInterface {
    name = 'Initial21684570227550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "ip1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "ip1"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "name" character varying NOT NULL`);
    }

}
