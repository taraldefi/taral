import {MigrationInterface, QueryRunner} from "typeorm";

export class update1697038196577 implements MigrationInterface {
    name = 'update1697038196577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Buyers" ADD "applicationId" uuid`);
        await queryRunner.query(`ALTER TABLE "Buyers" ADD CONSTRAINT "UQ_45d5e00ca1f36e521e2a666c9f7" UNIQUE ("applicationId")`);
        await queryRunner.query(`ALTER TABLE "Buyers" ADD CONSTRAINT "FK_45d5e00ca1f36e521e2a666c9f7" FOREIGN KEY ("applicationId") REFERENCES "Quick_Applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Buyers" DROP CONSTRAINT "FK_45d5e00ca1f36e521e2a666c9f7"`);
        await queryRunner.query(`ALTER TABLE "Buyers" DROP CONSTRAINT "UQ_45d5e00ca1f36e521e2a666c9f7"`);
        await queryRunner.query(`ALTER TABLE "Buyers" DROP COLUMN "applicationId"`);
    }

}
