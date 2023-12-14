import {MigrationInterface, QueryRunner} from "typeorm";

export class txDoc1702533066941 implements MigrationInterface {
    name = 'txDoc1702533066941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP CONSTRAINT "FK_5d723345616c1f9325704d03727"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP CONSTRAINT "FK_28b67dacf951ddf4cc2f7b59c46"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP CONSTRAINT "REL_5d723345616c1f9325704d0372"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP COLUMN "additionalDocumentId"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP CONSTRAINT "REL_28b67dacf951ddf4cc2f7b59c4"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP COLUMN "confirmationDocumentId"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD "confirmationDocument" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD "additionalDocument" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP COLUMN "additionalDocument"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" DROP COLUMN "confirmationDocument"`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD "confirmationDocumentId" uuid`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD CONSTRAINT "REL_28b67dacf951ddf4cc2f7b59c4" UNIQUE ("confirmationDocumentId")`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD "additionalDocumentId" uuid`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD CONSTRAINT "REL_5d723345616c1f9325704d0372" UNIQUE ("additionalDocumentId")`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD CONSTRAINT "FK_28b67dacf951ddf4cc2f7b59c46" FOREIGN KEY ("confirmationDocumentId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TransactionDocuments" ADD CONSTRAINT "FK_5d723345616c1f9325704d03727" FOREIGN KEY ("additionalDocumentId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
