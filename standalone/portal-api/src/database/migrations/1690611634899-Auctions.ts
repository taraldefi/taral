import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auctions1690611634899 implements MigrationInterface {
  name = 'Auctions1690611634899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auction_bids_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" character varying NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "changes" json NOT NULL DEFAULT '{}', "hash" character(64) NOT NULL, "auctionId" integer NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "bidder" character varying NOT NULL, CONSTRAINT "CHK_6c4e750761fe8516e09a77b04e" CHECK ("action" IN ('insert', 'update', 'delete')), CONSTRAINT "PK_d8cefa4fe1dd8bf6fe48d2c70de" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Bids" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "hash" character(64) NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "bidder" character varying NOT NULL, "auctionId" integer, CONSTRAINT "PK_c883ef5b8fbd0d953d39c3b7a7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."Auctions_status_enum" AS ENUM('FINALIZED', 'OPEN', 'CLOSED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "Auctions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "hash" character(64) NOT NULL, "auctionId" integer NOT NULL, "endBlock" character varying NOT NULL, "highestBid" character varying, "maker" character varying NOT NULL, "nftAsset" character varying NOT NULL, "highestBidder" character varying, "status" "public"."Auctions_status_enum" NOT NULL DEFAULT 'OPEN', CONSTRAINT "PK_cb157335b3d35a7144c48d123e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."auctions_history_status_enum" AS ENUM('FINALIZED', 'OPEN', 'CLOSED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "auctions_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" character varying NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "changes" json NOT NULL DEFAULT '{}', "hash" character(64) NOT NULL, "auctionId" integer NOT NULL, "endBlock" character varying NOT NULL, "highestBid" character varying, "maker" character varying NOT NULL, "nftAsset" character varying NOT NULL, "highestBidder" character varying, "status" "public"."auctions_history_status_enum" NOT NULL DEFAULT 'OPEN', CONSTRAINT "CHK_058da0f8f89bebc2b50711eb2c" CHECK ("action" IN ('insert', 'update', 'delete')), CONSTRAINT "PK_1d0cde049207d87cc40487680fb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "hash" character(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "rolea" ADD "hash" character(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "hash" character(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_templates" ADD "hash" character(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ALTER COLUMN "createdAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ALTER COLUMN "updatedAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "rolea" ALTER COLUMN "createdAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "rolea" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "rolea" ALTER COLUMN "updatedAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "rolea" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "createdAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updatedAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_templates" ALTER COLUMN "createdAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_templates" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_templates" ALTER COLUMN "updatedAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_templates" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "Bids" ADD CONSTRAINT "FK_ed42474e4bfeee3269835924ff3" FOREIGN KEY ("auctionId") REFERENCES "Auctions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Bids" DROP CONSTRAINT "FK_ed42474e4bfeee3269835924ff3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_templates" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_templates" ALTER COLUMN "updatedAt" TYPE TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_templates" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_templates" ALTER COLUMN "createdAt" TYPE TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updatedAt" TYPE TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "createdAt" TYPE TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "rolea" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "rolea" ALTER COLUMN "updatedAt" TYPE TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "rolea" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "rolea" ALTER COLUMN "createdAt" TYPE TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ALTER COLUMN "updatedAt" TYPE TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ALTER COLUMN "createdAt" TYPE TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE "email_templates" DROP COLUMN "hash"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hash"`);
    await queryRunner.query(`ALTER TABLE "rolea" DROP COLUMN "hash"`);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "hash"`);
    await queryRunner.query(`DROP TABLE "auctions_history"`);
    await queryRunner.query(
      `DROP TYPE "public"."auctions_history_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "Auctions"`);
    await queryRunner.query(`DROP TYPE "public"."Auctions_status_enum"`);
    await queryRunner.query(`DROP TABLE "Bids"`);
    await queryRunner.query(`DROP TABLE "auction_bids_history"`);
  }
}
