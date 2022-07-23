import { MigrationInterface, QueryRunner } from 'typeorm';

export class FileParticipants1658573655708 implements MigrationInterface {
  name = 'FileParticipants1658573655708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file_participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, "fileId" integer, CONSTRAINT "PK_9ed1cee80af226663d3c53f2264" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants" ADD CONSTRAINT "FK_0eee1af876ab19e84889482aa6b" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file_participants" DROP CONSTRAINT "FK_0eee1af876ab19e84889482aa6b"`,
    );
    await queryRunner.query(`DROP TABLE "file_participants"`);
  }
}
