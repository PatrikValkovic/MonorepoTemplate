import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAndToken1666440069764 implements MigrationInterface {
    name = 'UserAndToken1666440069764';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."token_type_enum" AS ENUM('RefreshToken')
        `);
        await queryRunner.query(`
            CREATE TABLE "token" (
                "token" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" "public"."token_type_enum" NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "expiresAt" TIMESTAMP NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_d9959ee7e17e2293893444ea371" PRIMARY KEY ("token")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "username" character varying(128) NOT NULL,
                "slug" character varying(128) NOT NULL,
                "email" character varying(256) NOT NULL,
                "password" character varying(120) NOT NULL,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_ac08b39ccb744ea6682c0db1c2d" UNIQUE ("slug"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "token"
            ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "token"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."token_type_enum"
        `);
    }

}
