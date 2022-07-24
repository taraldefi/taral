import { MigrationInterface, QueryRunner } from 'typeorm';

export class FileParticipantPublicKey1658679016760
  implements MigrationInterface
{
  name = 'FileParticipantPublicKey1658679016760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file_participants" ADD "publicKey" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file_participants" DROP COLUMN "publicKey"`,
    );
  }
}
