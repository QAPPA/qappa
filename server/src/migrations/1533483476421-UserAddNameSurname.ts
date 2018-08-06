import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddNameSurname1533483476421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` ADD `name` varchar(100) NOT NULL');
        await queryRunner.query('ALTER TABLE `users` ADD `surname` varchar(100) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `surname`');
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `name`');
    }

}
