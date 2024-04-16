import {MigrationInterface, QueryRunner} from "typeorm";

export class orderProduct1713245917817 implements MigrationInterface {
    name = 'orderProduct1713245917817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "unitPrice" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "unitPrice" integer NOT NULL`);
    }

}
