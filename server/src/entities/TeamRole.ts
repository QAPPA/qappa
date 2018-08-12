import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectUser } from './ProjectUser';

@Entity({ name: 'team_roles' })
export class TeamRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @ManyToMany(type => ProjectUser, projectUser => projectUser.roles)
    users: ProjectUser[];
}
