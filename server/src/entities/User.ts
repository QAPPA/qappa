import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProjectUser } from './ProjectUser';
import { Project } from './Project';

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 100
    })
    surname: string;

    @Column({
        length: 100
    })
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    admin: boolean;

    @OneToMany(type => ProjectUser, projectUser => projectUser.user)
    projects: ProjectUser[];

    @OneToMany(type => Project, project => project.responsibleUser)
    responsibleFor: Project[];
}
