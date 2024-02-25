import {MigrationInterface, QueryRunner} from "typeorm";

export class companyInformationChanges1708845448020 implements MigrationInterface {
    name = 'companyInformationChanges1708845448020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CompanyInformation" ADD "email" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CompanyInformation" DROP COLUMN "email"`);
    }

}
