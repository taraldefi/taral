import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1702907482770 implements MigrationInterface {
  name = 'InitialMigration1702907482770';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auction_bids_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" character varying NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "changes" json NOT NULL DEFAULT '{}', "hash" character(64) NOT NULL, "auctionId" integer NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "bidder" character varying NOT NULL, CONSTRAINT "CHK_6c4e750761fe8516e09a77b04e" CHECK ("action" IN ('insert', 'update', 'delete')), CONSTRAINT "PK_d8cefa4fe1dd8bf6fe48d2c70de" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "CompanyAddresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying NOT NULL, "addressLine1" character varying NOT NULL, "addressLine2" character varying NOT NULL, "postalCode" character varying NOT NULL, CONSTRAINT "PK_0313dfd6528659ba1917a92d5d8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "CompanyInformation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employeeCount" integer, "type" character varying NOT NULL, "addressId" uuid, CONSTRAINT "REL_d4269c155a69922cd29f7eca09" UNIQUE ("addressId"), CONSTRAINT "PK_66bb02343b9cdb0a0729de4138d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f8183f26c3767e444b13c71279" ON "CompanyInformation" ("type") `,
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
      `CREATE TABLE "SupplierCompanyTaxAndRevenue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "taxNumber" integer, "lastFiscalYear" integer NOT NULL, "totalRevenue" character varying NOT NULL, "exportValue" integer, "audited" boolean, "exportRevenuePercentage" numeric(10,2) DEFAULT '0', "supplierCompanyId" uuid, CONSTRAINT "PK_63b4af95edad8d2228401f11c21" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "SupplierCompanies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "registrationNumber" character varying NOT NULL, "beneficialOwner" character varying NOT NULL, "abbreviation" character varying NOT NULL, "nationality" character varying NOT NULL, "headquarters" character varying NOT NULL, "industryType" character varying NOT NULL, "coreBusiness" character varying NOT NULL, "incorporationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "legalForm" character varying NOT NULL, "logo" character varying, "financialsId" uuid, "ratingId" uuid, "companyInformationId" uuid, CONSTRAINT "REL_528e78318d2b1007fda27291a7" UNIQUE ("financialsId"), CONSTRAINT "REL_4d60a8cd8f9d65dc5f0374b32f" UNIQUE ("ratingId"), CONSTRAINT "REL_6c2f56b7f6034211a233004183" UNIQUE ("companyInformationId"), CONSTRAINT "PK_2e491cc0ac8484134538ad7eef9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."CollaborationRelationships_paymentexperiencehistory_enum" AS ENUM('ON_TIME', 'DELAYS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "CollaborationRelationships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shareHoldingRelationship" character varying, "influence" character varying, "supplierId" uuid, "buyerId" uuid, "paymentExperienceDescription" character varying, "paymentExperienceLength" character varying, "paymentExperienceNoofdeals" integer, "paymentExperienceAvgbusinessvol" character varying, "paymentExperienceHistory" "public"."CollaborationRelationships_paymentexperiencehistory_enum", "paymentExperienceDelays" character varying, CONSTRAINT "PK_8b5a77158ca83fd4dfc36245f34" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "BuyerCompanyTaxAndRevenue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "taxNumber" integer, "lastFiscalYear" integer NOT NULL, "totalRevenue" character varying NOT NULL, "exportValue" integer, "audited" boolean, "exportRevenuePercentage" numeric(10,2) DEFAULT '0', "buyerCompanyId" uuid, CONSTRAINT "PK_2e252b0e1ad71a795505287b195" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "BuyerCompanies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "registrationNumber" character varying NOT NULL, "beneficialOwner" character varying NOT NULL, "abbreviation" character varying NOT NULL, "nationality" character varying NOT NULL, "headquarters" character varying NOT NULL, "industryType" character varying NOT NULL, "coreBusiness" character varying NOT NULL, "incorporationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "legalForm" character varying NOT NULL, "logo" character varying, "sectorId" uuid, "companyInformationId" uuid, CONSTRAINT "REL_6c3070b3bc2f295ddc24b4ad92" UNIQUE ("sectorId"), CONSTRAINT "REL_3f842c6b8708da37970bd70a14" UNIQUE ("companyInformationId"), CONSTRAINT "PK_788566f542e6013706e371f236f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."Collaterals_facilitytype_enum" AS ENUM('IMPORTER_FINANCING', 'EXPORTER_FINANCING')`,
    );
    await queryRunner.query(
      `CREATE TABLE "Collaterals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "facilityType" "public"."Collaterals_facilitytype_enum" NOT NULL, "financingRatio" numeric(2,2) NOT NULL DEFAULT '0', "facilityAmount" numeric(10,2) NOT NULL DEFAULT '0', "requestedTenure" TIMESTAMP WITH TIME ZONE NOT NULL, "requestedPurpose" character varying NOT NULL, "repaymentSource" character varying NOT NULL, "collateralProviderInfluence" character varying, "collateralProviderExperience" character varying, CONSTRAINT "PK_76a2cc571bfa3f4926c61200af2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."PaymentTerms_paymenttype_enum" AS ENUM('SHORT', 'MEDIUM', 'SHORT_MEDIUM')`,
    );
    await queryRunner.query(
      `CREATE TABLE "PaymentTerms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isConcluded" boolean NOT NULL DEFAULT false, "partialRefinancing" boolean NOT NULL DEFAULT false, "interestCurrency" character varying, "interestPercentage" numeric(10,2) DEFAULT '0', "interestFixedRate" numeric(10,2) DEFAULT '0', "interestDegressiveRate" numeric(10,2) DEFAULT '0', "paymentType" "public"."PaymentTerms_paymenttype_enum" NOT NULL, "downpaymentCurrency" character varying NOT NULL, "downpaymentAmount" character varying NOT NULL, "downpaymentDescription" character varying NOT NULL, "balanceCurrency" character varying NOT NULL, "balanceAmount" character varying NOT NULL, "balancePaymentDeadline" character varying NOT NULL, "paymentVehicleDescription" character varying NOT NULL, "paymentDuration" character varying NOT NULL, CONSTRAINT "PK_85ade235e83a47c423ab766eadf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "TransactionDocuments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "confirmationDocument" boolean, "additionalDocument" boolean, CONSTRAINT "PK_8488f8e87bde7dacf065cec4cbb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orderProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "unitPrice" integer NOT NULL, "orderId" uuid, CONSTRAINT "PK_cb16d1f7ac5d8fcd6d66edf3254" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orderDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "importPort" character varying NOT NULL, "exportPort" character varying NOT NULL, CONSTRAINT "PK_11d407f307ebf19af9702464e22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."QuickApplications_status_enum" AS ENUM('ACTIVE', 'COMPLETED', 'IN_REVIEW', 'APPROVED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "QuickApplications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "applicationNumber" character varying NOT NULL, "title" character varying NOT NULL, "exporterName" character varying NOT NULL, "issuanceDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "public"."QuickApplications_status_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "type" character varying NOT NULL, "buyerInformationId" uuid, "supplierInformationId" uuid, "paymentTermsId" uuid, "orderDetailsId" uuid, "securityId" uuid, "transactionDocumentsId" uuid, "companyId" uuid, CONSTRAINT "UQ_85c10210343cf46c064d81bd28e" UNIQUE ("applicationNumber"), CONSTRAINT "REL_f3c3b88e296d4f48588391c31c" UNIQUE ("buyerInformationId"), CONSTRAINT "REL_9c7f5e3cd5c3cbc2ff1d2b172b" UNIQUE ("paymentTermsId"), CONSTRAINT "REL_9714c72d5f4bdbff1b3b1065ac" UNIQUE ("orderDetailsId"), CONSTRAINT "REL_42d992ef8ec8ab6d5bd3e482a5" UNIQUE ("securityId"), CONSTRAINT "REL_fc64ed251907a199aaa04b6e8f" UNIQUE ("transactionDocumentsId"), CONSTRAINT "PK_6f485ac97e0f3240b34a2054726" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_78ce6c5802f85135a670114d1a" ON "QuickApplications" ("type") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."auctions_history_status_enum" AS ENUM('FINALIZED', 'OPEN', 'CLOSED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "auctions_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" character varying NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "changes" json NOT NULL DEFAULT '{}', "hash" character(64) NOT NULL, "auctionId" integer NOT NULL, "endBlock" character varying NOT NULL, "highestBid" character varying, "maker" character varying NOT NULL, "nftAsset" character varying NOT NULL, "highestBidder" character varying, "status" "public"."auctions_history_status_enum" NOT NULL DEFAULT 'OPEN', CONSTRAINT "CHK_058da0f8f89bebc2b50711eb2c" CHECK ("action" IN ('insert', 'update', 'delete')), CONSTRAINT "PK_1d0cde049207d87cc40487680fb" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "resource" character varying(100) NOT NULL, "description" character varying NOT NULL, "path" character varying NOT NULL, "method" character varying(20) NOT NULL DEFAULT 'get', "isDefault" boolean NOT NULL, CONSTRAINT "UQ_b690135d86d59cc689d465ac952" UNIQUE ("description"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rolea" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "name" text NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_e7a191b2b5a62281445d665cc51" UNIQUE ("name"), CONSTRAINT "PK_90194187649484d907469c5e923" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying, "contact" character varying, "avatar" character varying, "status" character varying NOT NULL, "token" character varying, "tokenValidityDate" TIMESTAMP NOT NULL DEFAULT now(), "salt" character varying NOT NULL, "twoFASecret" character varying, "twoFAThrottleTime" TIMESTAMP NOT NULL DEFAULT now(), "isTwoFAEnabled" boolean NOT NULL DEFAULT false, "roleId" integer NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file_participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet" character varying NOT NULL, "publicKey" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_9ed1cee80af226663d3c53f2264" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "original_name" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file_versions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "path" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, "on_disk_name" character varying NOT NULL, "fileId" uuid, CONSTRAINT "PK_caca394bb05012a3d17c1d8b336" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "role_permission" ("roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_b42bbacb8402c353df822432544" PRIMARY KEY ("roleId", "permissionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e3130a39c1e4a740d044e68573" ON "role_permission" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72e80be86cab0e93e67ed1a7a9" ON "role_permission" ("permissionId") `,
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
      `ALTER TABLE "CompanyInformation" ADD CONSTRAINT "FK_d4269c155a69922cd29f7eca09e" FOREIGN KEY ("addressId") REFERENCES "CompanyAddresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "SupplierCompanyTaxAndRevenue" ADD CONSTRAINT "FK_d62129e190f3e09af585acb9d67" FOREIGN KEY ("supplierCompanyId") REFERENCES "SupplierCompanies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "SupplierCompanies" ADD CONSTRAINT "FK_528e78318d2b1007fda27291a7b" FOREIGN KEY ("financialsId") REFERENCES "FinancialInformations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "SupplierCompanies" ADD CONSTRAINT "FK_4d60a8cd8f9d65dc5f0374b32f7" FOREIGN KEY ("ratingId") REFERENCES "ExternalRatings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "SupplierCompanies" ADD CONSTRAINT "FK_6c2f56b7f6034211a2330041834" FOREIGN KEY ("companyInformationId") REFERENCES "CompanyInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ADD CONSTRAINT "FK_b3ea6eb6940a5cd0ad6ce70c126" FOREIGN KEY ("supplierId") REFERENCES "SupplierCompanies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ADD CONSTRAINT "FK_d0b33148e450c41053a3597d3b1" FOREIGN KEY ("buyerId") REFERENCES "BuyerCompanies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "BuyerCompanyTaxAndRevenue" ADD CONSTRAINT "FK_5ad7c7c244a7d681a273157ddc3" FOREIGN KEY ("buyerCompanyId") REFERENCES "BuyerCompanies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "BuyerCompanies" ADD CONSTRAINT "FK_6c3070b3bc2f295ddc24b4ad929" FOREIGN KEY ("sectorId") REFERENCES "Sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "BuyerCompanies" ADD CONSTRAINT "FK_3f842c6b8708da37970bd70a14f" FOREIGN KEY ("companyInformationId") REFERENCES "CompanyInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orderProducts" ADD CONSTRAINT "FK_93e963c47272eb995d0b9ac533f" FOREIGN KEY ("orderId") REFERENCES "orderDetails"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" ADD CONSTRAINT "FK_f3c3b88e296d4f48588391c31cf" FOREIGN KEY ("buyerInformationId") REFERENCES "CompanyInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" ADD CONSTRAINT "FK_f1fa843341d95bbb126794a9548" FOREIGN KEY ("supplierInformationId") REFERENCES "SupplierCompanies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" ADD CONSTRAINT "FK_9c7f5e3cd5c3cbc2ff1d2b172be" FOREIGN KEY ("paymentTermsId") REFERENCES "PaymentTerms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" ADD CONSTRAINT "FK_9714c72d5f4bdbff1b3b1065acf" FOREIGN KEY ("orderDetailsId") REFERENCES "orderDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" ADD CONSTRAINT "FK_42d992ef8ec8ab6d5bd3e482a5b" FOREIGN KEY ("securityId") REFERENCES "Collaterals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" ADD CONSTRAINT "FK_fc64ed251907a199aaa04b6e8f3" FOREIGN KEY ("transactionDocumentsId") REFERENCES "TransactionDocuments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" ADD CONSTRAINT "FK_07d172ff77ef3c90675db063664" FOREIGN KEY ("companyId") REFERENCES "BuyerCompanies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Bids" ADD CONSTRAINT "FK_ed42474e4bfeee3269835924ff3" FOREIGN KEY ("auctionId") REFERENCES "Auctions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "rolea"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_versions" ADD CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" ADD CONSTRAINT "FK_6a3743deaf73e36a0defcec1158" FOREIGN KEY ("goodsAndServicesId") REFERENCES "Services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" ADD CONSTRAINT "FK_e1accc56c67658990c6a1bfed8c" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "rolea"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "FK_1d7cb3ff06675dbb97386e18afd" FOREIGN KEY ("fileParticipantsId") REFERENCES "file_participants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "FK_011dad0a532b96fb1e70387bf57" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "FK_011dad0a532b96fb1e70387bf57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "FK_1d7cb3ff06675dbb97386e18afd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" DROP CONSTRAINT "FK_e1accc56c67658990c6a1bfed8c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Transactions" DROP CONSTRAINT "FK_6a3743deaf73e36a0defcec1158"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_versions" DROP CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Bids" DROP CONSTRAINT "FK_ed42474e4bfeee3269835924ff3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" DROP CONSTRAINT "FK_07d172ff77ef3c90675db063664"`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" DROP CONSTRAINT "FK_fc64ed251907a199aaa04b6e8f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" DROP CONSTRAINT "FK_42d992ef8ec8ab6d5bd3e482a5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" DROP CONSTRAINT "FK_9714c72d5f4bdbff1b3b1065acf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" DROP CONSTRAINT "FK_9c7f5e3cd5c3cbc2ff1d2b172be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" DROP CONSTRAINT "FK_f1fa843341d95bbb126794a9548"`,
    );
    await queryRunner.query(
      `ALTER TABLE "QuickApplications" DROP CONSTRAINT "FK_f3c3b88e296d4f48588391c31cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_93e963c47272eb995d0b9ac533f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "BuyerCompanies" DROP CONSTRAINT "FK_3f842c6b8708da37970bd70a14f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "BuyerCompanies" DROP CONSTRAINT "FK_6c3070b3bc2f295ddc24b4ad929"`,
    );
    await queryRunner.query(
      `ALTER TABLE "BuyerCompanyTaxAndRevenue" DROP CONSTRAINT "FK_5ad7c7c244a7d681a273157ddc3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" DROP CONSTRAINT "FK_d0b33148e450c41053a3597d3b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" DROP CONSTRAINT "FK_b3ea6eb6940a5cd0ad6ce70c126"`,
    );
    await queryRunner.query(
      `ALTER TABLE "SupplierCompanies" DROP CONSTRAINT "FK_6c2f56b7f6034211a2330041834"`,
    );
    await queryRunner.query(
      `ALTER TABLE "SupplierCompanies" DROP CONSTRAINT "FK_4d60a8cd8f9d65dc5f0374b32f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "SupplierCompanies" DROP CONSTRAINT "FK_528e78318d2b1007fda27291a7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "SupplierCompanyTaxAndRevenue" DROP CONSTRAINT "FK_d62129e190f3e09af585acb9d67"`,
    );
    await queryRunner.query(
      `ALTER TABLE "CompanyInformation" DROP CONSTRAINT "FK_d4269c155a69922cd29f7eca09e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_011dad0a532b96fb1e70387bf5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1d7cb3ff06675dbb97386e18af"`,
    );
    await queryRunner.query(`DROP TABLE "file_participants_files_file"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_72e80be86cab0e93e67ed1a7a9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e3130a39c1e4a740d044e68573"`,
    );
    await queryRunner.query(`DROP TABLE "role_permission"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`DROP TABLE "email_templates"`);
    await queryRunner.query(`DROP TABLE "Contracts"`);
    await queryRunner.query(`DROP TABLE "Transactions"`);
    await queryRunner.query(`DROP TABLE "Services"`);
    await queryRunner.query(`DROP TABLE "file_versions"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "file_participants"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "rolea"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TABLE "Bids"`);
    await queryRunner.query(`DROP TABLE "Auctions"`);
    await queryRunner.query(`DROP TYPE "public"."Auctions_status_enum"`);
    await queryRunner.query(`DROP TABLE "auctions_history"`);
    await queryRunner.query(
      `DROP TYPE "public"."auctions_history_status_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_78ce6c5802f85135a670114d1a"`,
    );
    await queryRunner.query(`DROP TABLE "QuickApplications"`);
    await queryRunner.query(
      `DROP TYPE "public"."QuickApplications_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "orderDetails"`);
    await queryRunner.query(`DROP TABLE "orderProducts"`);
    await queryRunner.query(`DROP TABLE "TransactionDocuments"`);
    await queryRunner.query(`DROP TABLE "PaymentTerms"`);
    await queryRunner.query(
      `DROP TYPE "public"."PaymentTerms_paymenttype_enum"`,
    );
    await queryRunner.query(`DROP TABLE "Collaterals"`);
    await queryRunner.query(
      `DROP TYPE "public"."Collaterals_facilitytype_enum"`,
    );
    await queryRunner.query(`DROP TABLE "BuyerCompanies"`);
    await queryRunner.query(`DROP TABLE "BuyerCompanyTaxAndRevenue"`);
    await queryRunner.query(`DROP TABLE "Sectors"`);
    await queryRunner.query(`DROP TYPE "public"."Sectors_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."Sectors_type_enum"`);
    await queryRunner.query(`DROP TABLE "CollaborationRelationships"`);
    await queryRunner.query(
      `DROP TYPE "public"."CollaborationRelationships_paymentexperiencehistory_enum"`,
    );
    await queryRunner.query(`DROP TABLE "SupplierCompanies"`);
    await queryRunner.query(`DROP TABLE "SupplierCompanyTaxAndRevenue"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6aa5a39bde5e98cafe1e6a04bc"`,
    );
    await queryRunner.query(`DROP TABLE "ExternalRatings"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_add7fce755d3af211905a03b39"`,
    );
    await queryRunner.query(`DROP TABLE "FinancialInformations"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f8183f26c3767e444b13c71279"`,
    );
    await queryRunner.query(`DROP TABLE "CompanyInformation"`);
    await queryRunner.query(`DROP TABLE "CompanyAddresses"`);
    await queryRunner.query(`DROP TABLE "auction_bids_history"`);
  }
}
