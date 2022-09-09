import {MigrationInterface, QueryRunner} from "typeorm";

export class LinkSupplierCompany1661877832389 implements MigrationInterface {
    name = 'LinkSupplierCompany1661877832389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD "companyId" uuid`);
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD CONSTRAINT "UQ_a9f507ce81ecc3d58203f673fa3" UNIQUE ("companyId")`);
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD CONSTRAINT "FK_a9f507ce81ecc3d58203f673fa3" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP CONSTRAINT "FK_a9f507ce81ecc3d58203f673fa3"`);
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP CONSTRAINT "UQ_a9f507ce81ecc3d58203f673fa3"`);
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP COLUMN "companyId"`);
    }

}
