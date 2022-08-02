import { MigrationInterface, QueryRunner } from 'typeorm';

export class FileParticipants1658678420880 implements MigrationInterface {
  name = 'FileParticipants1658678420880';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file_participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_9ed1cee80af226663d3c53f2264" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file_participants_files_file" ("fileParticipantsId" uuid NOT NULL, "fileId" integer NOT NULL, CONSTRAINT "PK_025fe43f19a4e1862c8f4112e2c" PRIMARY KEY ("fileParticipantsId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1d7cb3ff06675dbb97386e18af" ON "file_participants_files_file" ("fileParticipantsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_011dad0a532b96fb1e70387bf5" ON "file_participants_files_file" ("fileId") `,
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
      `DROP INDEX "public"."IDX_011dad0a532b96fb1e70387bf5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1d7cb3ff06675dbb97386e18af"`,
    );
    await queryRunner.query(`DROP TABLE "file_participants_files_file"`);
    await queryRunner.query(`DROP TABLE "file_participants"`);
  }
}
