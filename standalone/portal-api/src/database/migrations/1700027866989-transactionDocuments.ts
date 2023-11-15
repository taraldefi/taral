import {MigrationInterface, QueryRunner} from "typeorm";

export class transactionDocuments1700027866989 implements MigrationInterface {
    name = 'transactionDocuments1700027866989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD "confirmationDocumentId" uuid`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD CONSTRAINT "UQ_28b67dacf951ddf4cc2f7b59c46" UNIQUE ("confirmationDocumentId")`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD "additionalDocumentId" uuid`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD CONSTRAINT "UQ_5d723345616c1f9325704d03727" UNIQUE ("additionalDocumentId")`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD CONSTRAINT "FK_28b67dacf951ddf4cc2f7b59c46" FOREIGN KEY ("confirmationDocumentId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD CONSTRAINT "FK_5d723345616c1f9325704d03727" FOREIGN KEY ("additionalDocumentId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP CONSTRAINT "FK_5d723345616c1f9325704d03727"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP CONSTRAINT "FK_28b67dacf951ddf4cc2f7b59c46"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP CONSTRAINT "UQ_5d723345616c1f9325704d03727"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP COLUMN "additionalDocumentId"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP CONSTRAINT "UQ_28b67dacf951ddf4cc2f7b59c46"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP COLUMN "confirmationDocumentId"`);
    }

}
