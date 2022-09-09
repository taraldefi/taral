import {MigrationInterface, QueryRunner} from "typeorm";

export class Buyers1662042053164 implements MigrationInterface {
    name = 'Buyers1662042053164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Buyers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyId" uuid, "sectorId" uuid, CONSTRAINT "REL_57582ae718a29ffb43bf23dcfd" UNIQUE ("companyId"), CONSTRAINT "REL_03433ae18e45b1e5781a797acf" UNIQUE ("sectorId"), CONSTRAINT "PK_b8a4c362c89a7b2296fd2fbe105" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Buyers" ADD CONSTRAINT "FK_57582ae718a29ffb43bf23dcfd3" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyers" ADD CONSTRAINT "FK_03433ae18e45b1e5781a797acff" FOREIGN KEY ("sectorId") REFERENCES "Sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Buyers" DROP CONSTRAINT "FK_03433ae18e45b1e5781a797acff"`);
        await queryRunner.query(`ALTER TABLE "Buyers" DROP CONSTRAINT "FK_57582ae718a29ffb43bf23dcfd3"`);
        await queryRunner.query(`DROP TABLE "Buyers"`);
    }

}
