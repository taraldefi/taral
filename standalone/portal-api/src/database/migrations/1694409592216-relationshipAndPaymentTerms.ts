import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipAndPaymentTerms1694409592216 implements MigrationInterface {
    name = 'relationshipAndPaymentTerms1694409592216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Companies" RENAME COLUMN "taxNumber" TO "taxAndRevenueId"`);
        await queryRunner.query(`CREATE TABLE "CompanyTaxAndRevenue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "taxNumber" character varying NOT NULL, "lastFiscalYear" TIMESTAMP WITH TIME ZONE NOT NULL, "totalRevenue" character varying NOT NULL, "exportValue" integer NOT NULL, "audited" boolean NOT NULL, "exportRevenuePercentage" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_0100eb1d34631e67d26b67efa7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."CollaborationRelationships_paymentexperiencehistory_enum" AS ENUM('ON_TIME', 'DELAYS')`);
        await queryRunner.query(`CREATE TABLE "CollaborationRelationships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shareHoldingRelationship" character varying NOT NULL, "influence" character varying NOT NULL, "supplierId" uuid, "buyerId" uuid, "paymentExperienceDescription" character varying NOT NULL, "paymentExperienceLength" character varying NOT NULL, "paymentExperienceNoofdeals" integer NOT NULL, "paymentExperienceAvgbusinessvol" character varying NOT NULL, "paymentExperienceHistory" "public"."CollaborationRelationships_paymentexperiencehistory_enum" NOT NULL, "paymentExperienceDelays" character varying NOT NULL, CONSTRAINT "PK_8b5a77158ca83fd4dfc36245f34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."PaymentTerms_paymenttype_enum" AS ENUM('SHORT', 'MEDIUM', 'SHORT_MEDIUM')`);
        await queryRunner.query(`CREATE TABLE "PaymentTerms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isConcluded" boolean NOT NULL, "partialRefinancing" boolean NOT NULL, "interestCurrency" character varying NOT NULL, "interestPercentage" numeric(10,2) NOT NULL DEFAULT '0', "interestFixedrate" numeric(10,2) NOT NULL DEFAULT '0', "interestDegressiverate" numeric(10,2) NOT NULL DEFAULT '0', "paymentType" "public"."PaymentTerms_paymenttype_enum" NOT NULL, "paymentDuration" character varying NOT NULL, CONSTRAINT "PK_85ade235e83a47c423ab766eadf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP COLUMN "taxAndRevenueId"`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD "taxAndRevenueId" uuid`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD CONSTRAINT "UQ_96328b06f0e4bf3954e067c2a2f" UNIQUE ("taxAndRevenueId")`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD CONSTRAINT "FK_96328b06f0e4bf3954e067c2a2f" FOREIGN KEY ("taxAndRevenueId") REFERENCES "CompanyTaxAndRevenue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CollaborationRelationships" ADD CONSTRAINT "FK_b3ea6eb6940a5cd0ad6ce70c126" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CollaborationRelationships" ADD CONSTRAINT "FK_d0b33148e450c41053a3597d3b1" FOREIGN KEY ("buyerId") REFERENCES "Buyers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CollaborationRelationships" DROP CONSTRAINT "FK_d0b33148e450c41053a3597d3b1"`);
        await queryRunner.query(`ALTER TABLE "CollaborationRelationships" DROP CONSTRAINT "FK_b3ea6eb6940a5cd0ad6ce70c126"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP CONSTRAINT "FK_96328b06f0e4bf3954e067c2a2f"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP CONSTRAINT "UQ_96328b06f0e4bf3954e067c2a2f"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP COLUMN "taxAndRevenueId"`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD "taxAndRevenueId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "PaymentTerms"`);
        await queryRunner.query(`DROP TYPE "public"."PaymentTerms_paymenttype_enum"`);
        await queryRunner.query(`DROP TABLE "CollaborationRelationships"`);
        await queryRunner.query(`DROP TYPE "public"."CollaborationRelationships_paymentexperiencehistory_enum"`);
        await queryRunner.query(`DROP TABLE "CompanyTaxAndRevenue"`);
        await queryRunner.query(`ALTER TABLE "Companies" RENAME COLUMN "taxAndRevenueId" TO "taxNumber"`);
    }

}
