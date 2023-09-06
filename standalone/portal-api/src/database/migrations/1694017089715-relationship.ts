import {MigrationInterface, QueryRunner} from "typeorm";

export class relationship1694017089715 implements MigrationInterface {
    name = 'relationship1694017089715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Companies" RENAME COLUMN "taxNumber" TO "taxAndRevenueId"`);
        await queryRunner.query(`CREATE TABLE "paymentExperienceRelationships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "paymentExperienceLength" character varying NOT NULL, "noOfDeals" integer NOT NULL, "avgBusinessVol" character varying NOT NULL, "paymentHistory" character varying NOT NULL, "paymentDelays" character varying NOT NULL, CONSTRAINT "PK_8704792b0847d13005680931bcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Relationships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "influence" character varying NOT NULL, "type" character varying NOT NULL, "paymentExperienceId" uuid, CONSTRAINT "REL_4da75c4defbf0e62c690ab7373" UNIQUE ("paymentExperienceId"), CONSTRAINT "PK_6fe48b538cdbde7450b44885a4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_846bb25df3c59f0b6c0f2cefbc" ON "Relationships" ("type") `);
        await queryRunner.query(`CREATE TABLE "CompanyTaxAndRevenue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "taxNumber" character varying NOT NULL, "lastFiscalYear" TIMESTAMP WITH TIME ZONE NOT NULL, "totalRevenue" character varying NOT NULL, "exportValue" integer NOT NULL, "audited" boolean NOT NULL, "exportRevenuePercentage" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_0100eb1d34631e67d26b67efa7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD "relationshipWithBuyerId" uuid`);
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD CONSTRAINT "UQ_867568f07a56839dc5a31f86810" UNIQUE ("relationshipWithBuyerId")`);
        await queryRunner.query(`ALTER TABLE "Buyers" ADD "relationshipWithSupplierId" uuid`);
        await queryRunner.query(`ALTER TABLE "Buyers" ADD CONSTRAINT "UQ_35ba74364e44c2e51e5c86bb2fc" UNIQUE ("relationshipWithSupplierId")`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP COLUMN "taxAndRevenueId"`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD "taxAndRevenueId" uuid`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD CONSTRAINT "UQ_96328b06f0e4bf3954e067c2a2f" UNIQUE ("taxAndRevenueId")`);
        await queryRunner.query(`ALTER TABLE "Relationships" ADD CONSTRAINT "FK_4da75c4defbf0e62c690ab73733" FOREIGN KEY ("paymentExperienceId") REFERENCES "paymentExperienceRelationships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD CONSTRAINT "FK_867568f07a56839dc5a31f86810" FOREIGN KEY ("relationshipWithBuyerId") REFERENCES "Relationships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD CONSTRAINT "FK_96328b06f0e4bf3954e067c2a2f" FOREIGN KEY ("taxAndRevenueId") REFERENCES "CompanyTaxAndRevenue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyers" ADD CONSTRAINT "FK_35ba74364e44c2e51e5c86bb2fc" FOREIGN KEY ("relationshipWithSupplierId") REFERENCES "Relationships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Buyers" DROP CONSTRAINT "FK_35ba74364e44c2e51e5c86bb2fc"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP CONSTRAINT "FK_96328b06f0e4bf3954e067c2a2f"`);
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP CONSTRAINT "FK_867568f07a56839dc5a31f86810"`);
        await queryRunner.query(`ALTER TABLE "Relationships" DROP CONSTRAINT "FK_4da75c4defbf0e62c690ab73733"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP CONSTRAINT "UQ_96328b06f0e4bf3954e067c2a2f"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP COLUMN "taxAndRevenueId"`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD "taxAndRevenueId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Buyers" DROP CONSTRAINT "UQ_35ba74364e44c2e51e5c86bb2fc"`);
        await queryRunner.query(`ALTER TABLE "Buyers" DROP COLUMN "relationshipWithSupplierId"`);
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP CONSTRAINT "UQ_867568f07a56839dc5a31f86810"`);
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP COLUMN "relationshipWithBuyerId"`);
        await queryRunner.query(`DROP TABLE "CompanyTaxAndRevenue"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_846bb25df3c59f0b6c0f2cefbc"`);
        await queryRunner.query(`DROP TABLE "Relationships"`);
        await queryRunner.query(`DROP TABLE "paymentExperienceRelationships"`);
        await queryRunner.query(`ALTER TABLE "Companies" RENAME COLUMN "taxAndRevenueId" TO "taxNumber"`);
    }

}
