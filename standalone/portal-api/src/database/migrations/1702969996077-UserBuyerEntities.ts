import {MigrationInterface, QueryRunner} from "typeorm";

export class UserBuyerEntities1702969996077 implements MigrationInterface {
    name = 'UserBuyerEntities1702969996077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" ADD CONSTRAINT "FK_912ca6f0ac9656def9d7df7296e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" DROP CONSTRAINT "FK_912ca6f0ac9656def9d7df7296e"`);
        await queryRunner.query(`ALTER TABLE "BuyerCompanies" DROP COLUMN "userId"`);
    }

}
