import {MigrationInterface, QueryRunner} from "typeorm";

export class txDocbool1702535150625 implements MigrationInterface {
    name = 'txDocbool1702535150625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ALTER COLUMN "confirmationDocument" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ALTER COLUMN "additionalDocument" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ALTER COLUMN "additionalDocument" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ALTER COLUMN "confirmationDocument" SET DEFAULT false`);
    }

}
