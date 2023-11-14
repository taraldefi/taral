import { MigrationInterface, QueryRunner } from 'typeorm';

export class relationshipChanges1698246151995 implements MigrationInterface {
  name = 'relationshipChanges1698246151995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "shareHoldingRelationship" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "influence" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceDescription" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceLength" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceNoofdeals" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceAvgbusinessvol" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceHistory" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceDelays" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceDelays" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceHistory" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceAvgbusinessvol" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceNoofdeals" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceLength" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "paymentExperienceDescription" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "influence" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "CollaborationRelationships" ALTER COLUMN "shareHoldingRelationship" SET NOT NULL`,
    );
  }
}
