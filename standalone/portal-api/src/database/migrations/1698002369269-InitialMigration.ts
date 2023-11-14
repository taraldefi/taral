import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1698002369269 implements MigrationInterface {
  name = 'InitialMigration1698002369269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Entities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "beneficialOwner" character varying NOT NULL, "abbreviation" character varying NOT NULL, "nationality" character varying NOT NULL, "headquarters" character varying NOT NULL, "industryType" character varying NOT NULL, "coreBusiness" character varying NOT NULL, "incorporationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "legalForm" character varying NOT NULL, "logo" character varying, "type" character varying NOT NULL, CONSTRAINT "PK_965022f62b8a06bd6d8f219c5e9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a2af183dc0c404b7825d998c3" ON "Entities" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "order_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "unitPrice" integer NOT NULL, "orderId" uuid, CONSTRAINT "PK_3e59f094c2dc3310d585216a813" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "importPort" character varying NOT NULL, "exportPort" character varying NOT NULL, CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "CompanyAddresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying NOT NULL, "addressLine1" character varying NOT NULL, "addressLine2" character varying NOT NULL, "postalCode" character varying NOT NULL, CONSTRAINT "PK_0313dfd6528659ba1917a92d5d8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "CompanyTaxAndRevenue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "taxNumber" character varying, "lastFiscalYear" TIMESTAMP WITH TIME ZONE NOT NULL, "totalRevenue" character varying NOT NULL, "exportValue" integer, "audited" boolean, "exportRevenuePercentage" numeric(10,2) DEFAULT '0', CONSTRAINT "PK_0100eb1d34631e67d26b67efa7a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying NOT NULL, "dateEstablished" TIMESTAMP WITH TIME ZONE NOT NULL, "phoneNumber" character varying NOT NULL, "employeeCount" integer, "registrationNumbers" character varying NOT NULL, "type" character varying NOT NULL, "taxAndRevenueId" uuid, "addressId" uuid, CONSTRAINT "REL_96328b06f0e4bf3954e067c2a2" UNIQUE ("taxAndRevenueId"), CONSTRAINT "REL_caaf3ac6fe63463f50c99c6d0b" UNIQUE ("addressId"), CONSTRAINT "PK_999ff985663bc48d13b08bce475" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_abd3a77683d5179383b9d4d64a" ON "Companies" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "FinancialInformations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "turnover" numeric(10,2) NOT NULL DEFAULT '0', "balanceSheetTotal" numeric(10,2) NOT NULL DEFAULT '0', "type" character varying NOT NULL, CONSTRAINT "PK_1bcb62b7d7160ecbeb13ccca57d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_add7fce755d3af211905a03b39" ON "FinancialInformations" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "ExternalRatings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" numeric(10,2) NOT NULL DEFAULT '0', "agencyName" character varying NOT NULL, "issuanceDate" TIMESTAMP WITH TIME ZONE NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_ed46faaa474dff253119c20bc64" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6aa5a39bde5e98cafe1e6a04bc" ON "ExternalRatings" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "Suppliers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyId" uuid, "financialsId" uuid, "ratingId" uuid, CONSTRAINT "REL_a9f507ce81ecc3d58203f673fa" UNIQUE ("companyId"), CONSTRAINT "REL_fcc62eefa3e8f3ca06de68ecd7" UNIQUE ("financialsId"), CONSTRAINT "REL_141b8ecc6c046ae0f68c9b8bb5" UNIQUE ("ratingId"), CONSTRAINT "PK_595a2df92a697af43bb23c8c42b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."CollaborationRelationships_paymentexperiencehistory_enum" AS ENUM('ON_TIME', 'DELAYS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "CollaborationRelationships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shareHoldingRelationship" character varying NOT NULL, "influence" character varying NOT NULL, "supplierId" uuid, "buyerId" uuid, "paymentExperienceDescription" character varying NOT NULL, "paymentExperienceLength" character varying NOT NULL, "paymentExperienceNoofdeals" integer NOT NULL, "paymentExperienceAvgbusinessvol" character varying NOT NULL, "paymentExperienceHistory" "public"."CollaborationRelationships_paymentexperiencehistory_enum" NOT NULL, "paymentExperienceDelays" character varying NOT NULL, CONSTRAINT "PK_8b5a77158ca83fd4dfc36245f34" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."Sectors_type_enum" AS ENUM('unknown', 'public', 'private')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."Sectors_status_enum" AS ENUM('unknown', 'subsidiary', 'independent')`,
    );
    await queryRunner.query(
      `CREATE TABLE "Sectors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "industryType" character varying NOT NULL, "type" "public"."Sectors_type_enum" NOT NULL DEFAULT 'unknown', "status" "public"."Sectors_status_enum" NOT NULL DEFAULT 'unknown', CONSTRAINT "PK_ad2730b7f1790d06da70779326c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Buyers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyId" uuid, "sectorId" uuid, "applicationId" uuid, CONSTRAINT "REL_57582ae718a29ffb43bf23dcfd" UNIQUE ("companyId"), CONSTRAINT "REL_03433ae18e45b1e5781a797acf" UNIQUE ("sectorId"), CONSTRAINT "REL_45d5e00ca1f36e521e2a666c9f" UNIQUE ("applicationId"), CONSTRAINT "PK_b8a4c362c89a7b2296fd2fbe105" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."Collaterals_facilitytype_enum" AS ENUM('IMPORTER_FINANCING', 'EXPORTER_FINANCING')`,
    );
    await queryRunner.query(
      `CREATE TABLE "Collaterals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "facilityType" "public"."Collaterals_facilitytype_enum" NOT NULL, "financingRatio" numeric(2,2) NOT NULL DEFAULT '0', "facilityAmount" numeric(10,2) NOT NULL DEFAULT '0', "requestedTenure" TIMESTAMP WITH TIME ZONE NOT NULL, "requestedPurpose" character varying NOT NULL, "repaymentSource" character varying NOT NULL, "collateralProviderInfluence" character varying NOT NULL, "collateralProviderExperience" character varying NOT NULL, CONSTRAINT "PK_76a2cc571bfa3f4926c61200af2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."PaymentTerms_paymenttype_enum" AS ENUM('SHORT', 'MEDIUM', 'SHORT_MEDIUM')`,
    );
    await queryRunner.query(
      `CREATE TABLE "PaymentTerms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isConcluded" boolean NOT NULL DEFAULT false, "partialRefinancing" boolean NOT NULL DEFAULT false, "interestCurrency" character varying NOT NULL, "interestPercentage" numeric(10,2) NOT NULL DEFAULT '0', "interestFixedRate" numeric(10,2) NOT NULL DEFAULT '0', "interestRegressiveRate" numeric(10,2) NOT NULL DEFAULT '0', "paymentType" "public"."PaymentTerms_paymenttype_enum" NOT NULL, "paymentDuration" character varying NOT NULL, CONSTRAINT "PK_85ade235e83a47c423ab766eadf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file_participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet" character varying NOT NULL, "publicKey" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_9ed1cee80af226663d3c53f2264" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file_versions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "path" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, "on_disk_name" character varying NOT NULL, "fileId" uuid, CONSTRAINT "PK_caca394bb05012a3d17c1d8b336" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "original_name" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL, "transactionDocumentsId" uuid, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "TransactionDocuments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_8488f8e87bde7dacf065cec4cbb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."Quick_Applications_status_enum" AS ENUM('ACTIVE', 'COMPLETED', 'ON_REVIEW', 'APPROVED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "Quick_Applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "issuanceDate" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "public"."Quick_Applications_status_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "type" character varying NOT NULL, "buyerInformationId" uuid, "supplierInformationId" uuid, "paymentTermsId" uuid, "securityId" uuid, "transactionDocumentsId" uuid, "orderDetailsId" uuid, "legalEntityId" uuid, CONSTRAINT "REL_c880a46a81d871b000f044e2f1" UNIQUE ("buyerInformationId"), CONSTRAINT "REL_bc9a4014f3ada292b2409b1762" UNIQUE ("supplierInformationId"), CONSTRAINT "REL_120c41277d35a0b906898f4203" UNIQUE ("paymentTermsId"), CONSTRAINT "REL_829b128211c2b717b0063b623a" UNIQUE ("securityId"), CONSTRAINT "REL_98f086756c6c954445d0bb8b4d" UNIQUE ("transactionDocumentsId"), CONSTRAINT "REL_54b2691a3c6b076b9340a82410" UNIQUE ("orderDetailsId"), CONSTRAINT "PK_fb0f0cdfbd5c49738fa3f04f110" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5a15ba9508a19521c3f7013cb4" ON "Quick_Applications" ("type") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."Auctions_status_enum" AS ENUM('FINALIZED', 'OPEN', 'CLOSED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "Auctions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "hash" character(64) NOT NULL, "auctionId" integer NOT NULL, "endBlock" character varying NOT NULL, "highestBid" character varying, "maker" character varying NOT NULL, "nftAsset" character varying NOT NULL, "highestBidder" character varying, "status" "public"."Auctions_status_enum" NOT NULL DEFAULT 'OPEN', CONSTRAINT "PK_cb157335b3d35a7144c48d123e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Bids" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "hash" character(64) NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "bidder" character varying NOT NULL, "auctionId" integer, CONSTRAINT "PK_c883ef5b8fbd0d953d39c3b7a7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auction_bids_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" character varying NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "changes" json NOT NULL DEFAULT '{}', "hash" character(64) NOT NULL, "auctionId" integer NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "bidder" character varying NOT NULL, CONSTRAINT "CHK_6c4e750761fe8516e09a77b04e" CHECK ("action" IN ('insert', 'update', 'delete')), CONSTRAINT "PK_d8cefa4fe1dd8bf6fe48d2c70de" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "resource" character varying(100) NOT NULL, "description" character varying NOT NULL, "path" character varying NOT NULL, "method" character varying(20) NOT NULL DEFAULT 'get', "isDefault" boolean NOT NULL, CONSTRAINT "UQ_b690135d86d59cc689d465ac952" UNIQUE ("description"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rolea" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "name" text NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_e7a191b2b5a62281445d665cc51" UNIQUE ("name"), CONSTRAINT "PK_90194187649484d907469c5e923" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying, "contact" character varying, "avatar" character varying, "status" character varying NOT NULL, "token" character varying, "tokenValidityDate" TIMESTAMP NOT NULL DEFAULT now(), "salt" character varying NOT NULL, "twoFASecret" character varying, "twoFAThrottleTime" TIMESTAMP NOT NULL DEFAULT now(), "isTwoFAEnabled" boolean NOT NULL DEFAULT false, "roleId" integer NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."auctions_history_status_enum" AS ENUM('FINALIZED', 'OPEN', 'CLOSED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "auctions_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" character varying NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "changes" json NOT NULL DEFAULT '{}', "hash" character(64) NOT NULL, "auctionId" integer NOT NULL, "endBlock" character varying NOT NULL, "highestBid" character varying, "maker" character varying NOT NULL, "nftAsset" character varying NOT NULL, "highestBidder" character varying, "status" "public"."auctions_history_status_enum" NOT NULL DEFAULT 'OPEN', CONSTRAINT "CHK_058da0f8f89bebc2b50711eb2c" CHECK ("action" IN ('insert', 'update', 'delete')), CONSTRAINT "PK_1d0cde049207d87cc40487680fb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "capitalGoods" boolean NOT NULL, "service" character varying NOT NULL, "serviceDescription" character varying NOT NULL, CONSTRAINT "PK_811d1dc4e17047c8aee4454b968" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "goodsAndServicesId" uuid, "contractId" uuid, CONSTRAINT "REL_6a3743deaf73e36a0defcec115" UNIQUE ("goodsAndServicesId"), CONSTRAINT "REL_e1accc56c67658990c6a1bfed8" UNIQUE ("contractId"), CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "conoclusion" TIMESTAMP WITH TIME ZONE NOT NULL, "isSigned" boolean NOT NULL, CONSTRAINT "PK_4f88addbb8b532d6e46459c8755" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "email_templates" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "title" character varying NOT NULL, "slug" character varying NOT NULL, "sender" character varying NOT NULL, "subject" character varying NOT NULL, "body" character varying NOT NULL, "isDefault" boolean NOT NULL, CONSTRAINT "UQ_4d77a74e85c275da60f4badf831" UNIQUE ("title"), CONSTRAINT "PK_06c564c515d8cdb40b6f3bfbbb4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "ip" character varying NOT NULL, "userAgent" character varying NOT NULL, "browser" character varying, "os" character varying, "isRevoked" boolean NOT NULL, "expires" TIMESTAMP NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file_participants_files_file" ("fileParticipantsId" uuid NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_025fe43f19a4e1862c8f4112e2c" PRIMARY KEY ("fileParticipantsId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1d7cb3ff06675dbb97386e18af" ON "file_participants_files_file" ("fileParticipantsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_011dad0a532b96fb1e70387bf5" ON "file_participants_files_file" ("fileId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permission" ("roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_b42bbacb8402c353df822432544" PRIMARY KEY ("roleId", "permissionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e3130a39c1e4a740d044e68573" ON "role_permission" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72e80be86cab0e93e67ed1a7a9" ON "role_permission" ("permissionId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_28b66449cf7cd76444378ad4e92" FOREIGN KEY ("orderId") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Companies" ADD CONSTRAINT "FK_96328b06f0e4bf3954e067c2a2f" FOREIGN KEY ("taxAndRevenueId") REFERENCES "CompanyTaxAndRevenue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Companies" ADD CONSTRAINT "FK_caaf3ac6fe63463f50c99c6d0bb" FOREIGN KEY ("addressId") REFERENCES "CompanyAddresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Suppliers" ADD CONSTRAINT "FK_a9f507ce81ecc3d58203f673fa3" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Suppliers" ADD CONSTRAINT "FK_fcc62eefa3e8f3ca06de68ecd72" FOREIGN KEY ("financialsId") REFERENCES "FinancialInformations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Suppliers" ADD CONSTRAINT "FK_141b8ecc6c046ae0f68c9b8bb5f" FOREIGN KEY ("ratingId") REFERENCES "ExternalRatings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ADD CONSTRAINT "FK_b3ea6eb6940a5cd0ad6ce70c126" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ADD CONSTRAINT "FK_d0b33148e450c41053a3597d3b1" FOREIGN KEY ("buyerId") REFERENCES "Buyers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Buyers" ADD CONSTRAINT "FK_57582ae718a29ffb43bf23dcfd3" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Buyers" ADD CONSTRAINT "FK_03433ae18e45b1e5781a797acff" FOREIGN KEY ("sectorId") REFERENCES "Sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Buyers" ADD CONSTRAINT "FK_45d5e00ca1f36e521e2a666c9f7" FOREIGN KEY ("applicationId") REFERENCES "Quick_Applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_versions" ADD CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_88977868473a43cee536dd81126" FOREIGN KEY ("transactionDocumentsId") REFERENCES "TransactionDocuments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_c880a46a81d871b000f044e2f14" FOREIGN KEY ("buyerInformationId") REFERENCES "Buyers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_bc9a4014f3ada292b2409b17620" FOREIGN KEY ("supplierInformationId") REFERENCES "Suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_120c41277d35a0b906898f42033" FOREIGN KEY ("paymentTermsId") REFERENCES "PaymentTerms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_829b128211c2b717b0063b623ab" FOREIGN KEY ("securityId") REFERENCES "Collaterals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_98f086756c6c954445d0bb8b4d1" FOREIGN KEY ("transactionDocumentsId") REFERENCES "TransactionDocuments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_54b2691a3c6b076b9340a824102" FOREIGN KEY ("orderDetailsId") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" ADD CONSTRAINT "FK_477149faf2275214810664facd5" FOREIGN KEY ("legalEntityId") REFERENCES "Entities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Bids" ADD CONSTRAINT "FK_ed42474e4bfeee3269835924ff3" FOREIGN KEY ("auctionId") REFERENCES "Auctions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "rolea"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" ADD CONSTRAINT "FK_6a3743deaf73e36a0defcec1158" FOREIGN KEY ("goodsAndServicesId") REFERENCES "Services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" ADD CONSTRAINT "FK_e1accc56c67658990c6a1bfed8c" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "FK_1d7cb3ff06675dbb97386e18afd" FOREIGN KEY ("fileParticipantsId") REFERENCES "file_participants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "FK_011dad0a532b96fb1e70387bf57" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "rolea"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "FK_011dad0a532b96fb1e70387bf57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "FK_1d7cb3ff06675dbb97386e18afd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" DROP CONSTRAINT "FK_e1accc56c67658990c6a1bfed8c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" DROP CONSTRAINT "FK_6a3743deaf73e36a0defcec1158"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Bids" DROP CONSTRAINT "FK_ed42474e4bfeee3269835924ff3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_477149faf2275214810664facd5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_54b2691a3c6b076b9340a824102"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_98f086756c6c954445d0bb8b4d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_829b128211c2b717b0063b623ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_120c41277d35a0b906898f42033"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_bc9a4014f3ada292b2409b17620"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Quick_Applications" DROP CONSTRAINT "FK_c880a46a81d871b000f044e2f14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_88977868473a43cee536dd81126"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_versions" DROP CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Buyers" DROP CONSTRAINT "FK_45d5e00ca1f36e521e2a666c9f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Buyers" DROP CONSTRAINT "FK_03433ae18e45b1e5781a797acff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Buyers" DROP CONSTRAINT "FK_57582ae718a29ffb43bf23dcfd3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" DROP CONSTRAINT "FK_d0b33148e450c41053a3597d3b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" DROP CONSTRAINT "FK_b3ea6eb6940a5cd0ad6ce70c126"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Suppliers" DROP CONSTRAINT "FK_141b8ecc6c046ae0f68c9b8bb5f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Suppliers" DROP CONSTRAINT "FK_fcc62eefa3e8f3ca06de68ecd72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Suppliers" DROP CONSTRAINT "FK_a9f507ce81ecc3d58203f673fa3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Companies" DROP CONSTRAINT "FK_caaf3ac6fe63463f50c99c6d0bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Companies" DROP CONSTRAINT "FK_96328b06f0e4bf3954e067c2a2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "FK_28b66449cf7cd76444378ad4e92"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_72e80be86cab0e93e67ed1a7a9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e3130a39c1e4a740d044e68573"`,
    );
    await queryRunner.query(`DROP TABLE "role_permission"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_011dad0a532b96fb1e70387bf5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1d7cb3ff06675dbb97386e18af"`,
    );
    await queryRunner.query(`DROP TABLE "file_participants_files_file"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`DROP TABLE "email_templates"`);
    await queryRunner.query(`DROP TABLE "Contracts"`);
    await queryRunner.query(`DROP TABLE "Transactions"`);
    await queryRunner.query(`DROP TABLE "Services"`);
    await queryRunner.query(`DROP TABLE "auctions_history"`);
    await queryRunner.query(
      `DROP TYPE "public"."auctions_history_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "rolea"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TABLE "auction_bids_history"`);
    await queryRunner.query(`DROP TABLE "Bids"`);
    await queryRunner.query(`DROP TABLE "Auctions"`);
    await queryRunner.query(`DROP TYPE "public"."Auctions_status_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5a15ba9508a19521c3f7013cb4"`,
    );
    await queryRunner.query(`DROP TABLE "Quick_Applications"`);
    await queryRunner.query(
      `DROP TYPE "public"."Quick_Applications_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "TransactionDocuments"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "file_versions"`);
    await queryRunner.query(`DROP TABLE "file_participants"`);
    await queryRunner.query(`DROP TABLE "PaymentTerms"`);
    await queryRunner.query(
      `DROP TYPE "public"."PaymentTerms_paymenttype_enum"`,
    );
    await queryRunner.query(`DROP TABLE "Collaterals"`);
    await queryRunner.query(
      `DROP TYPE "public"."Collaterals_facilitytype_enum"`,
    );
    await queryRunner.query(`DROP TABLE "Buyers"`);
    await queryRunner.query(`DROP TABLE "Sectors"`);
    await queryRunner.query(`DROP TYPE "public"."Sectors_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."Sectors_type_enum"`);
    await queryRunner.query(`DROP TABLE "CollaborationRelationships"`);
    await queryRunner.query(
      `DROP TYPE "public"."CollaborationRelationships_paymentexperiencehistory_enum"`,
    );
    await queryRunner.query(`DROP TABLE "Suppliers"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6aa5a39bde5e98cafe1e6a04bc"`,
    );
    await queryRunner.query(`DROP TABLE "ExternalRatings"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_add7fce755d3af211905a03b39"`,
    );
    await queryRunner.query(`DROP TABLE "FinancialInformations"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_abd3a77683d5179383b9d4d64a"`,
    );
    await queryRunner.query(`DROP TABLE "Companies"`);
    await queryRunner.query(`DROP TABLE "CompanyTaxAndRevenue"`);
    await queryRunner.query(`DROP TABLE "CompanyAddresses"`);
    await queryRunner.query(`DROP TABLE "order_details"`);
    await queryRunner.query(`DROP TABLE "order_products"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9a2af183dc0c404b7825d998c3"`,
    );
    await queryRunner.query(`DROP TABLE "Entities"`);
  }
}
