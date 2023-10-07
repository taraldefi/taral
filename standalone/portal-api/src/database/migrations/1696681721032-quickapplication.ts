import {MigrationInterface, QueryRunner} from "typeorm";

export class quickapplication1696681721032 implements MigrationInterface {
    name = 'quickapplication1696681721032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Base_Quick_Applications" DROP CONSTRAINT "FK_c4c468ec72cf5f5c2dd8c13e7ca"`);
        await queryRunner.query(`ALTER TABLE "Base_Quick_Applications" DROP COLUMN "legalEntityId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Base_Quick_Applications" ADD "legalEntityId" uuid`);
        await queryRunner.query(`ALTER TABLE "Base_Quick_Applications" ADD CONSTRAINT "FK_c4c468ec72cf5f5c2dd8c13e7ca" FOREIGN KEY ("legalEntityId") REFERENCES "legal-entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
