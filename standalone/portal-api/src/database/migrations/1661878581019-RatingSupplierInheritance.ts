import {MigrationInterface, QueryRunner} from "typeorm";

export class RatingSupplierInheritance1661878581019 implements MigrationInterface {
    name = 'RatingSupplierInheritance1661878581019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ExternalRatings" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_6aa5a39bde5e98cafe1e6a04bc" ON "ExternalRatings" ("type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6aa5a39bde5e98cafe1e6a04bc"`);
        await queryRunner.query(`ALTER TABLE "ExternalRatings" DROP COLUMN "type"`);
    }

}
