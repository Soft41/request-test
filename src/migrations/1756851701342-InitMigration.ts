import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1756851701342 implements MigrationInterface {
    name = 'InitMigration1756851701342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."requests_status_enum" AS ENUM('NEW', 'IN_PROGRESS', 'DONE')
        `);
        await queryRunner.query(`
            CREATE TABLE "requests" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "text" character varying NOT NULL,
                "status" "public"."requests_status_enum" NOT NULL DEFAULT 'NEW',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "requests"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."requests_status_enum"
        `);
    }

}
