import {MigrationInterface, QueryRunner} from "typeorm";

export class paymentExperience1712036241703 implements MigrationInterface {
    name = 'paymentExperience1712036241703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CollaborationRelationships" ADD "paymentExperienceCurrency" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CollaborationRelationships" DROP COLUMN "paymentExperienceCurrency"`);
    }

}
