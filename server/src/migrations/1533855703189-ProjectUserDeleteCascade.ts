import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProjectUserDeleteCascade1533855703189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `project_users` DROP FOREIGN KEY `FK_1905d9d76173d09c07ba1f0cd84`');
        await queryRunner.query('ALTER TABLE `project_users` DROP FOREIGN KEY `FK_6ebc83af455ff1ed9573c823e23`');
        await queryRunner.query('ALTER TABLE `project_users` ADD CONSTRAINT `FK_6ebc83af455ff1ed9573c823e23` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE');
        await queryRunner.query('ALTER TABLE `project_users` ADD CONSTRAINT `FK_1905d9d76173d09c07ba1f0cd84` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `project_users` DROP FOREIGN KEY `FK_1905d9d76173d09c07ba1f0cd84`');
        await queryRunner.query('ALTER TABLE `project_users` DROP FOREIGN KEY `FK_6ebc83af455ff1ed9573c823e23`');
        await queryRunner.query('ALTER TABLE `project_users` ADD CONSTRAINT `FK_6ebc83af455ff1ed9573c823e23` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT');
        await queryRunner.query('ALTER TABLE `project_users` ADD CONSTRAINT `FK_1905d9d76173d09c07ba1f0cd84` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT');
    }

}
