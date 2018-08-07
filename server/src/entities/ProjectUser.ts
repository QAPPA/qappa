import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { User } from './User';
import { Project } from './Project';
import { TeamRole } from './TeamRole';

@Entity({ name: 'project_users' })
export class ProjectUser {
    @ManyToOne(type => User, user => user.projects, { primary: true })
    user: User;

    @ManyToOne(type => Project, project => project.users, { primary: true })
    project: Project;

    @ManyToMany(type => TeamRole, teamRole => teamRole.users)
    @JoinTable({
        name: 'project_user_roles',
        joinColumns: [
            {
                name: 'userId',
                referencedColumnName: 'user'
            },
            {
                name: 'projectId',
                referencedColumnName: 'project'
            }
        ],
        inverseJoinColumns: [
            {
                name: 'roleId',
                referencedColumnName: 'id'
            }
        ]
    })
    roles: TeamRole[];
}
