import {MigrationInterface, QueryRunner} from "typeorm";

export class collateralAndOrderDetails1694518643923 implements MigrationInterface {
    name = 'collateralAndOrderDetails1694518643923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Collaterals_facilitytype_enum" AS ENUM('IMPORTER_FINANCING', 'EXPORTER_FINANCING')`);
        await queryRunner.query(`CREATE TABLE "Collaterals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "facilityType" "public"."Collaterals_facilitytype_enum" NOT NULL, "financingRatio" numeric(2,2) NOT NULL DEFAULT '0', "facilityAmount" numeric(10,2) NOT NULL DEFAULT '0', "requestedTenure" TIMESTAMP WITH TIME ZONE NOT NULL, "requestedPurpose" character varying NOT NULL, "repaymentSource" character varying NOT NULL, "collateralProviderInfluence" character varying NOT NULL, "collateralProviderExperience" character varying NOT NULL, CONSTRAINT "PK_76a2cc571bfa3f4926c61200af2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "unitPrice" integer NOT NULL, "orderId" uuid, CONSTRAINT "PK_cb16d1f7ac5d8fcd6d66edf3254" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "importerPort" character varying NOT NULL, "exporterPort" character varying NOT NULL, CONSTRAINT "PK_11d407f307ebf19af9702464e22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD CONSTRAINT "FK_93e963c47272eb995d0b9ac533f" FOREIGN KEY ("orderId") REFERENCES "orderDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_93e963c47272eb995d0b9ac533f"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP CONSTRAINT "FK_96328b06f0e4bf3954e067c2a2f"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP CONSTRAINT "UQ_96328b06f0e4bf3954e067c2a2f"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP COLUMN "taxAndRevenueId"`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD "taxAndRevenueId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "orderDetails"`);
        await queryRunner.query(`DROP TABLE "orderProducts"`);
        await queryRunner.query(`DROP TABLE "Collaterals"`);
        await queryRunner.query(`DROP TYPE "public"."Collaterals_facilitytype_enum"`);
        await queryRunner.query(`DROP TABLE "CompanyTaxAndRevenue"`);
        await queryRunner.query(`ALTER TABLE "Companies" RENAME COLUMN "taxAndRevenueId" TO "taxNumber"`);
    }

}
