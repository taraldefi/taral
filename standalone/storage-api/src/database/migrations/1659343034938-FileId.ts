import { MigrationInterface, QueryRunner } from 'typeorm';

export class FileId1659343034938 implements MigrationInterface {
  name = 'FileId1659343034938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file_versions" DROP CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4"`,
    );
    await queryRunner.query(`ALTER TABLE "file_versions" DROP COLUMN "fileId"`);
    await queryRunner.query(`ALTER TABLE "file_versions" ADD "fileId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "FK_011dad0a532b96fb1e70387bf57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d"`,
    );
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "file" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "PK_025fe43f19a4e1862c8f4112e2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "PK_1d7cb3ff06675dbb97386e18afd" PRIMARY KEY ("fileParticipantsId")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_011dad0a532b96fb1e70387bf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP COLUMN "fileId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD "fileId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "PK_1d7cb3ff06675dbb97386e18afd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "PK_025fe43f19a4e1862c8f4112e2c" PRIMARY KEY ("fileParticipantsId", "fileId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_011dad0a532b96fb1e70387bf5" ON "file_participants_files_file" ("fileId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "file_versions" ADD CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "file_versions" DROP CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_011dad0a532b96fb1e70387bf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "PK_025fe43f19a4e1862c8f4112e2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "PK_1d7cb3ff06675dbb97386e18afd" PRIMARY KEY ("fileParticipantsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP COLUMN "fileId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD "fileId" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_011dad0a532b96fb1e70387bf5" ON "file_participants_files_file" ("fileId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" DROP CONSTRAINT "PK_1d7cb3ff06675dbb97386e18afd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "PK_025fe43f19a4e1862c8f4112e2c" PRIMARY KEY ("fileParticipantsId", "fileId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d"`,
    );
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "file" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_participants_files_file" ADD CONSTRAINT "FK_011dad0a532b96fb1e70387bf57" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "file_versions" DROP COLUMN "fileId"`);
    await queryRunner.query(`ALTER TABLE "file_versions" ADD "fileId" integer`);
    await queryRunner.query(
      `ALTER TABLE "file_versions" ADD CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
