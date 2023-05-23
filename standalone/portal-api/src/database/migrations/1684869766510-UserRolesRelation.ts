import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRolesRelation1684869766510 implements MigrationInterface {
    name = 'UserRolesRelation1684869766510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_368e146b785b574f42ae9e53d5"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "rolea"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_368e146b785b574f42ae9e53d5" UNIQUE ("roleId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "rolea"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
