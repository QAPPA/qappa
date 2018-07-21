import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1532093001931 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `name`');
        await queryRunner.query('ALTER TABLE `users` ADD `email` varchar(100) NOT NULL');
        await queryRunner.query('ALTER TABLE `users` ADD `password` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `users` ADD `admin` tinyint NOT NULL DEFAULT 0');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `admin`');
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `password`');
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `email`');
        await queryRunner.query('ALTER TABLE `users` ADD `name` varchar(100) NOT NULL');
    }

}
