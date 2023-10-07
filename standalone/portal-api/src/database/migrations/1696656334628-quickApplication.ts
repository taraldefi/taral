import {MigrationInterface, QueryRunner} from "typeorm";

export class quickApplication1696656334628 implements MigrationInterface {
    name = 'quickApplication1696656334628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quick_application_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "buyerInformationId" uuid, "supplierInformationId" uuid, "paymentTermsId" uuid, "securityId" uuid, "transactionDocumentsId" uuid, CONSTRAINT "REL_bf4530804688448f3aa22fef5c" UNIQUE ("buyerInformationId"), CONSTRAINT "REL_915cad31daba2d5a44dd1d74f3" UNIQUE ("supplierInformationId"), CONSTRAINT "REL_8af259f613e1ff7bb0479f78ad" UNIQUE ("paymentTermsId"), CONSTRAINT "REL_c7916a87f5febf8ba7b6514fea" UNIQUE ("securityId"), CONSTRAINT "REL_704faea96665551e6240d0b0d1" UNIQUE ("transactionDocumentsId"), CONSTRAINT "PK_85962f65fff9fe3037e1be78ea5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Buyer_Quick_Applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "buyerInformationId" uuid, "supplierInformationId" uuid, "paymentTermsId" uuid, "securityId" uuid, "transactionDocumentsId" uuid, "relationshipWithBuyerId" uuid, "orderDetailsId" uuid, CONSTRAINT "REL_a8a262d88e97c0be49cf585417" UNIQUE ("buyerInformationId"), CONSTRAINT "REL_65314bce28c85057662b972406" UNIQUE ("supplierInformationId"), CONSTRAINT "REL_926038ea13b423a50854dc4897" UNIQUE ("paymentTermsId"), CONSTRAINT "REL_f1e1ae09ce585896937b84356e" UNIQUE ("securityId"), CONSTRAINT "REL_56861eca0f67481bc2dbbf5f1f" UNIQUE ("transactionDocumentsId"), CONSTRAINT "REL_1049086a55e3642c5f399e0b6a" UNIQUE ("relationshipWithBuyerId"), CONSTRAINT "REL_c9b7e2218ce1c4d104f271c11b" UNIQUE ("orderDetailsId"), CONSTRAINT "PK_568d688d7ed95c3bdc9f644fa8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Supplier_Quick_Applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "buyerInformationId" uuid, "supplierInformationId" uuid, "paymentTermsId" uuid, "securityId" uuid, "transactionDocumentsId" uuid, "relationshipWithBuyerId" uuid, CONSTRAINT "REL_12bd87d498f72ae97c8365fbdd" UNIQUE ("buyerInformationId"), CONSTRAINT "REL_4bf88a0b3e3a1fd39a9ab26bdf" UNIQUE ("supplierInformationId"), CONSTRAINT "REL_31a12053f8699303845e065599" UNIQUE ("paymentTermsId"), CONSTRAINT "REL_925df114465c18bcd737c49f7f" UNIQUE ("securityId"), CONSTRAINT "REL_abcb968cf9f3be6cbb1d999a19" UNIQUE ("transactionDocumentsId"), CONSTRAINT "REL_bee3bbb4d18fa96aee1dfbbb93" UNIQUE ("relationshipWithBuyerId"), CONSTRAINT "PK_c8d49a1d9b0dab327837fab94d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quick_application_entity" ADD CONSTRAINT "FK_bf4530804688448f3aa22fef5cc" FOREIGN KEY ("buyerInformationId") REFERENCES "Buyers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quick_application_entity" ADD CONSTRAINT "FK_915cad31daba2d5a44dd1d74f3a" FOREIGN KEY ("supplierInformationId") REFERENCES "Suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quick_application_entity" ADD CONSTRAINT "FK_8af259f613e1ff7bb0479f78ad7" FOREIGN KEY ("paymentTermsId") REFERENCES "PaymentTerms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quick_application_entity" ADD CONSTRAINT "FK_c7916a87f5febf8ba7b6514fea2" FOREIGN KEY ("securityId") REFERENCES "Collaterals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quick_application_entity" ADD CONSTRAINT "FK_704faea96665551e6240d0b0d12" FOREIGN KEY ("transactionDocumentsId") REFERENCES "TransactionDocuments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" ADD CONSTRAINT "FK_a8a262d88e97c0be49cf5854174" FOREIGN KEY ("buyerInformationId") REFERENCES "Buyers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" ADD CONSTRAINT "FK_65314bce28c85057662b972406f" FOREIGN KEY ("supplierInformationId") REFERENCES "Suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" ADD CONSTRAINT "FK_926038ea13b423a50854dc4897b" FOREIGN KEY ("paymentTermsId") REFERENCES "PaymentTerms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" ADD CONSTRAINT "FK_f1e1ae09ce585896937b84356e9" FOREIGN KEY ("securityId") REFERENCES "Collaterals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" ADD CONSTRAINT "FK_56861eca0f67481bc2dbbf5f1fd" FOREIGN KEY ("transactionDocumentsId") REFERENCES "TransactionDocuments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" ADD CONSTRAINT "FK_1049086a55e3642c5f399e0b6ac" FOREIGN KEY ("relationshipWithBuyerId") REFERENCES "CollaborationRelationships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" ADD CONSTRAINT "FK_c9b7e2218ce1c4d104f271c11b5" FOREIGN KEY ("orderDetailsId") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" ADD CONSTRAINT "FK_12bd87d498f72ae97c8365fbdd8" FOREIGN KEY ("buyerInformationId") REFERENCES "Buyers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" ADD CONSTRAINT "FK_4bf88a0b3e3a1fd39a9ab26bdf4" FOREIGN KEY ("supplierInformationId") REFERENCES "Suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" ADD CONSTRAINT "FK_31a12053f8699303845e0655995" FOREIGN KEY ("paymentTermsId") REFERENCES "PaymentTerms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" ADD CONSTRAINT "FK_925df114465c18bcd737c49f7f8" FOREIGN KEY ("securityId") REFERENCES "Collaterals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" ADD CONSTRAINT "FK_abcb968cf9f3be6cbb1d999a193" FOREIGN KEY ("transactionDocumentsId") REFERENCES "TransactionDocuments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" ADD CONSTRAINT "FK_bee3bbb4d18fa96aee1dfbbb93c" FOREIGN KEY ("relationshipWithBuyerId") REFERENCES "CollaborationRelationships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" DROP CONSTRAINT "FK_bee3bbb4d18fa96aee1dfbbb93c"`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" DROP CONSTRAINT "FK_abcb968cf9f3be6cbb1d999a193"`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" DROP CONSTRAINT "FK_925df114465c18bcd737c49f7f8"`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" DROP CONSTRAINT "FK_31a12053f8699303845e0655995"`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" DROP CONSTRAINT "FK_4bf88a0b3e3a1fd39a9ab26bdf4"`);
        await queryRunner.query(`ALTER TABLE "Supplier_Quick_Applications" DROP CONSTRAINT "FK_12bd87d498f72ae97c8365fbdd8"`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" DROP CONSTRAINT "FK_c9b7e2218ce1c4d104f271c11b5"`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" DROP CONSTRAINT "FK_1049086a55e3642c5f399e0b6ac"`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" DROP CONSTRAINT "FK_56861eca0f67481bc2dbbf5f1fd"`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" DROP CONSTRAINT "FK_f1e1ae09ce585896937b84356e9"`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" DROP CONSTRAINT "FK_926038ea13b423a50854dc4897b"`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" DROP CONSTRAINT "FK_65314bce28c85057662b972406f"`);
        await queryRunner.query(`ALTER TABLE "Buyer_Quick_Applications" DROP CONSTRAINT "FK_a8a262d88e97c0be49cf5854174"`);
        await queryRunner.query(`ALTER TABLE "quick_application_entity" DROP CONSTRAINT "FK_704faea96665551e6240d0b0d12"`);
        await queryRunner.query(`ALTER TABLE "quick_application_entity" DROP CONSTRAINT "FK_c7916a87f5febf8ba7b6514fea2"`);
        await queryRunner.query(`ALTER TABLE "quick_application_entity" DROP CONSTRAINT "FK_8af259f613e1ff7bb0479f78ad7"`);
        await queryRunner.query(`ALTER TABLE "quick_application_entity" DROP CONSTRAINT "FK_915cad31daba2d5a44dd1d74f3a"`);
        await queryRunner.query(`ALTER TABLE "quick_application_entity" DROP CONSTRAINT "FK_bf4530804688448f3aa22fef5cc"`);
        await queryRunner.query(`DROP TABLE "Supplier_Quick_Applications"`);
        await queryRunner.query(`DROP TABLE "Buyer_Quick_Applications"`);
        await queryRunner.query(`DROP TABLE "quick_application_entity"`);
    }

}
