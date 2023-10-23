import {MigrationInterface, QueryRunner} from "typeorm";

export class ContractSupplierApplication1698085632413 implements MigrationInterface {
    name = 'ContractSupplierApplication1698085632413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Quick_Applications" ADD "contractId" uuid`);
        await queryRunner.query(`ALTER TABLE "Quick_Applications" ADD CONSTRAINT "UQ_1b9b8aa96ff3e183accfbe68442" UNIQUE ("contractId")`);
        await queryRunner.query(`ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_1b9b8aa96ff3e183accfbe68442" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_1b9b8aa96ff3e183accfbe68442"`);
        await queryRunner.query(`ALTER TABLE "Quick_Applications" DROP CONSTRAINT "UQ_1b9b8aa96ff3e183accfbe68442"`);
        await queryRunner.query(`ALTER TABLE "Quick_Applications" DROP COLUMN "contractId"`);
    }

}
