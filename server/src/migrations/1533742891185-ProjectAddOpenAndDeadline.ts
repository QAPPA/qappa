import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProjectAddOpenAndDeadline1533742891185 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `projects` ADD `open` tinyint NOT NULL DEFAULT 1');
        await queryRunner.query('ALTER TABLE `projects` ADD `deadline` date NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `projects` DROP COLUMN `deadline`');
        await queryRunner.query('ALTER TABLE `projects` DROP COLUMN `open`');
    }

}
