import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1683468912139 implements MigrationInterface {
    name = 'InitialMigration1683468912139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "FinancialInformations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "turnover" numeric(10,2) NOT NULL DEFAULT '0', "balanceSheetTotal" numeric(10,2) NOT NULL DEFAULT '0', "type" character varying NOT NULL, CONSTRAINT "PK_1bcb62b7d7160ecbeb13ccca57d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_add7fce755d3af211905a03b39" ON "FinancialInformations" ("type") `);
        await queryRunner.query(`CREATE TABLE "ExternalRatings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" numeric(10,2) NOT NULL DEFAULT '0', "agencyName" character varying NOT NULL, "issuanceDate" TIMESTAMP WITH TIME ZONE NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_ed46faaa474dff253119c20bc64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6aa5a39bde5e98cafe1e6a04bc" ON "ExternalRatings" ("type") `);
        await queryRunner.query(`CREATE TABLE "Suppliers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyId" uuid, "financialsId" uuid, "ratingId" uuid, CONSTRAINT "REL_a9f507ce81ecc3d58203f673fa" UNIQUE ("companyId"), CONSTRAINT "REL_fcc62eefa3e8f3ca06de68ecd7" UNIQUE ("financialsId"), CONSTRAINT "REL_141b8ecc6c046ae0f68c9b8bb5" UNIQUE ("ratingId"), CONSTRAINT "PK_595a2df92a697af43bb23c8c42b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CompanyAddresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying NOT NULL, "addressLine1" character varying NOT NULL, "addressLine2" character varying NOT NULL, "postalCode" character varying NOT NULL, CONSTRAINT "PK_0313dfd6528659ba1917a92d5d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying NOT NULL, "dateEstablished" TIMESTAMP WITH TIME ZONE NOT NULL, "employeeCount" integer NOT NULL, "taxNumber" character varying NOT NULL, "registrationNumbers" character varying NOT NULL, "type" character varying NOT NULL, "addressId" uuid, CONSTRAINT "REL_caaf3ac6fe63463f50c99c6d0b" UNIQUE ("addressId"), CONSTRAINT "PK_999ff985663bc48d13b08bce475" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_abd3a77683d5179383b9d4d64a" ON "Companies" ("type") `);
        await queryRunner.query(`CREATE TYPE "public"."Sectors_type_enum" AS ENUM('unknown', 'public', 'private')`);
        await queryRunner.query(`CREATE TYPE "public"."Sectors_status_enum" AS ENUM('unknown', 'subsidiary', 'independent')`);
        await queryRunner.query(`CREATE TABLE "Sectors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "industryType" character varying NOT NULL, "type" "public"."Sectors_type_enum" NOT NULL DEFAULT 'unknown', "status" "public"."Sectors_status_enum" NOT NULL DEFAULT 'unknown', CONSTRAINT "PK_ad2730b7f1790d06da70779326c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Buyers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyId" uuid, "sectorId" uuid, CONSTRAINT "REL_57582ae718a29ffb43bf23dcfd" UNIQUE ("companyId"), CONSTRAINT "REL_03433ae18e45b1e5781a797acf" UNIQUE ("sectorId"), CONSTRAINT "PK_b8a4c362c89a7b2296fd2fbe105" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "issuanceDate" TIMESTAMP WITH TIME ZONE NOT NULL, "maturityDate" TIMESTAMP WITH TIME ZONE NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "legalEntityId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "legal-entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "beneficialOwner" character varying NOT NULL, "abbreviation" character varying NOT NULL, "nationality" character varying NOT NULL, "headquaters" character varying NOT NULL, "industryType" character varying NOT NULL, "coreBusiness" character varying NOT NULL, "incorporationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "legalForm" character varying NOT NULL, "logo" character varying NOT NULL, CONSTRAINT "PK_675e4b60aefb4cbab6912c64db0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "issuanceDate" TIMESTAMP WITH TIME ZONE NOT NULL, "legalEntityId" uuid, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "capitalGoods" boolean NOT NULL, "service" character varying NOT NULL, "serviceDescription" character varying NOT NULL, CONSTRAINT "PK_811d1dc4e17047c8aee4454b968" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "goodsAndServicesId" uuid, "contractId" uuid, CONSTRAINT "REL_6a3743deaf73e36a0defcec115" UNIQUE ("goodsAndServicesId"), CONSTRAINT "REL_e1accc56c67658990c6a1bfed8" UNIQUE ("contractId"), CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "conoclusion" TIMESTAMP WITH TIME ZONE NOT NULL, "isSigned" boolean NOT NULL, CONSTRAINT "PK_4f88addbb8b532d6e46459c8755" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet" character varying NOT NULL, "publicKey" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_9ed1cee80af226663d3c53f2264" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "original_name" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_versions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "path" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, "on_disk_name" character varying NOT NULL, "fileId" uuid, CONSTRAINT "PK_caca394bb05012a3d17c1d8b336" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "firstName" character varying, "lastName" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `);
        await queryRunner.query(`CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `);
        await queryRunner.query(`CREATE TABLE "forgot" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `);
        await queryRunner.query(`CREATE TABLE "file_participants_files_file" ("fileParticipantsId" uuid NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_025fe43f19a4e1862c8f4112e2c" PRIMARY KEY ("fileParticipantsId", "fileId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1d7cb3ff06675dbb97386e18af" ON "file_participants_files_file" ("fileParticipantsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_011dad0a532b96fb1e70387bf5" ON "file_participants_files_file" ("fileId") `);
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD CONSTRAINT "FK_a9f507ce81ecc3d58203f673fa3" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD CONSTRAINT "FK_fcc62eefa3e8f3ca06de68ecd72" FOREIGN KEY ("financialsId") REFERENCES "FinancialInformations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Suppliers" ADD CONSTRAINT "FK_141b8ecc6c046ae0f68c9b8bb5f" FOREIGN KEY ("ratingId") REFERENCES "ExternalRatings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD CONSTRAINT "FK_caaf3ac6fe63463f50c99c6d0bb" FOREIGN KEY ("addressId") REFERENCES "CompanyAddresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyers" ADD CONSTRAINT "FK_57582ae718a29ffb43bf23dcfd3" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyers" ADD CONSTRAINT "FK_03433ae18e45b1e5781a797acff" FOREIGN KEY ("sectorId") REFERENCES "Sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_23b9f864ea15307ea743e754705" FOREIGN KEY ("legalEntityId") REFERENCES "legal-entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_a7a3c33f6ec1c830ef246f9dd60" FOREIGN KEY ("legalEntityId") REFERENCES "legal-entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_6a3743deaf73e36a0defcec1158" FOREIGN KEY ("goodsAndServicesId") REFERENCES "Services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_e1accc56c67658990c6a1bfed8c" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_versions" ADD CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "FK_1d7cb3ff06675dbb97386e18afd" FOREIGN KEY ("fileParticipantsId") REFERENCES "file_participants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "FK_011dad0a532b96fb1e70387bf57" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "FK_011dad0a532b96fb1e70387bf57"`);
        await queryRunner.query(`ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "FK_1d7cb3ff06675dbb97386e18afd"`);
        await queryRunner.query(`ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "file_versions" DROP CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_e1accc56c67658990c6a1bfed8c"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_6a3743deaf73e36a0defcec1158"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_a7a3c33f6ec1c830ef246f9dd60"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_23b9f864ea15307ea743e754705"`);
        await queryRunner.query(`ALTER TABLE "Buyers" DROP CONSTRAINT "FK_03433ae18e45b1e5781a797acff"`);
        await queryRunner.query(`ALTER TABLE "Buyers" DROP CONSTRAINT "FK_57582ae718a29ffb43bf23dcfd3"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP CONSTRAINT "FK_caaf3ac6fe63463f50c99c6d0bb"`);
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP CONSTRAINT "FK_141b8ecc6c046ae0f68c9b8bb5f"`);
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP CONSTRAINT "FK_fcc62eefa3e8f3ca06de68ecd72"`);
        await queryRunner.query(`ALTER TABLE "Suppliers" DROP CONSTRAINT "FK_a9f507ce81ecc3d58203f673fa3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_011dad0a532b96fb1e70387bf5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1d7cb3ff06675dbb97386e18af"`);
        await queryRunner.query(`DROP TABLE "file_participants_files_file"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df507d27b0fb20cd5f7bef9b9a"`);
        await queryRunner.query(`DROP TABLE "forgot"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "file_versions"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "file_participants"`);
        await queryRunner.query(`DROP TABLE "Contracts"`);
        await queryRunner.query(`DROP TABLE "Transactions"`);
        await queryRunner.query(`DROP TABLE "Services"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TABLE "legal-entity"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "Buyers"`);
        await queryRunner.query(`DROP TABLE "Sectors"`);
        await queryRunner.query(`DROP TYPE "public"."Sectors_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Sectors_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_abd3a77683d5179383b9d4d64a"`);
        await queryRunner.query(`DROP TABLE "Companies"`);
        await queryRunner.query(`DROP TABLE "CompanyAddresses"`);
        await queryRunner.query(`DROP TABLE "Suppliers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6aa5a39bde5e98cafe1e6a04bc"`);
        await queryRunner.query(`DROP TABLE "ExternalRatings"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_add7fce755d3af211905a03b39"`);
        await queryRunner.query(`DROP TABLE "FinancialInformations"`);
    }

}
