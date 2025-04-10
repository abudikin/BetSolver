import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1744251212204 implements MigrationInterface {
    name = 'InitMigration1744251212204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dispute_participant" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "userId" integer, "disputeId" integer, CONSTRAINT "PK_fde03103fd25c7d787b2a53a97b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evidence" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "url" character varying NOT NULL, "disputeId" integer, CONSTRAINT "PK_b864cb5d49854f89917fc0b44b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dispute" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "stake" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deadline" TIMESTAMP, "creatorId" integer, CONSTRAINT "PK_e2f1f4741f2094ce789b0a7c5b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "reputation" integer NOT NULL DEFAULT '0', "wins" integer NOT NULL DEFAULT '0', "losses" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "statistic" ("id" SERIAL NOT NULL, "totalDisputes" integer NOT NULL DEFAULT '0', "wins" integer NOT NULL DEFAULT '0', "losses" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_e3e6fd496e1988019d8a46749ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dispute_participant" ADD CONSTRAINT "FK_ac6aa32f083c1b50c81d757805d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dispute_participant" ADD CONSTRAINT "FK_3b3f8a8b39bd7bcf311d51ab8a4" FOREIGN KEY ("disputeId") REFERENCES "dispute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evidence" ADD CONSTRAINT "FK_44a873d9d007080d132d07fe04a" FOREIGN KEY ("disputeId") REFERENCES "dispute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dispute" ADD CONSTRAINT "FK_94ddfa79050d625409ddd966745" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "dispute" DROP CONSTRAINT "FK_94ddfa79050d625409ddd966745"`);
        await queryRunner.query(`ALTER TABLE "evidence" DROP CONSTRAINT "FK_44a873d9d007080d132d07fe04a"`);
        await queryRunner.query(`ALTER TABLE "dispute_participant" DROP CONSTRAINT "FK_3b3f8a8b39bd7bcf311d51ab8a4"`);
        await queryRunner.query(`ALTER TABLE "dispute_participant" DROP CONSTRAINT "FK_ac6aa32f083c1b50c81d757805d"`);
        await queryRunner.query(`DROP TABLE "statistic"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "dispute"`);
        await queryRunner.query(`DROP TABLE "evidence"`);
        await queryRunner.query(`DROP TABLE "dispute_participant"`);
    }

}
