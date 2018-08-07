import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectRelatedEntities1533660699009 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `team_roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `project_users` (`userId` int NOT NULL, `projectId` int NOT NULL, PRIMARY KEY (`userId`, `projectId`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `projects` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `responsibleUserId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `project_user_roles` (`userId` int NOT NULL, `projectId` int NOT NULL, `roleId` int NOT NULL, PRIMARY KEY (`userId`, `projectId`, `roleId`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `project_users` ADD CONSTRAINT `FK_6ebc83af455ff1ed9573c823e23` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)');
        await queryRunner.query('ALTER TABLE `project_users` ADD CONSTRAINT `FK_1905d9d76173d09c07ba1f0cd84` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`)');
        await queryRunner.query('ALTER TABLE `projects` ADD CONSTRAINT `FK_bbaa8d3f931c8c6c9ceb53cdc25` FOREIGN KEY (`responsibleUserId`) REFERENCES `users`(`id`)');
        await queryRunner.query('ALTER TABLE `project_user_roles` ADD CONSTRAINT `FK_344ac1c6a03d4042e96c8297bbe` FOREIGN KEY (`userId`, `projectId`) REFERENCES `project_users`(`userId`,`projectId`) ON DELETE CASCADE');
        await queryRunner.query('ALTER TABLE `project_user_roles` ADD CONSTRAINT `FK_519368ea4dcc7e3d6e7946c7d6e` FOREIGN KEY (`roleId`) REFERENCES `team_roles`(`id`) ON DELETE CASCADE');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `project_user_roles` DROP FOREIGN KEY `FK_519368ea4dcc7e3d6e7946c7d6e`');
        await queryRunner.query('ALTER TABLE `project_user_roles` DROP FOREIGN KEY `FK_344ac1c6a03d4042e96c8297bbe`');
        await queryRunner.query('ALTER TABLE `projects` DROP FOREIGN KEY `FK_bbaa8d3f931c8c6c9ceb53cdc25`');
        await queryRunner.query('ALTER TABLE `project_users` DROP FOREIGN KEY `FK_1905d9d76173d09c07ba1f0cd84`');
        await queryRunner.query('ALTER TABLE `project_users` DROP FOREIGN KEY `FK_6ebc83af455ff1ed9573c823e23`');
        await queryRunner.query('DROP TABLE `project_user_roles`');
        await queryRunner.query('DROP TABLE `projects`');
        await queryRunner.query('DROP TABLE `project_users`');
        await queryRunner.query('DROP TABLE `team_roles`');
    }

}
