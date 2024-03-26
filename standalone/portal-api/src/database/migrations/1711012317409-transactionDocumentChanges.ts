import {MigrationInterface, QueryRunner} from "typeorm";

export class transactionDocumentChanges1711012317409 implements MigrationInterface {
    name = 'transactionDocumentChanges1711012317409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD "creditCardStatement" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP COLUMN "creditCardStatement"`);
    }

}
