import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectUser } from './ProjectUser';
import { User } from './User';

@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ default: true })
    open: boolean;

    @Column('date')
    deadline: Date;

    @OneToMany(type => ProjectUser, projectUser => projectUser.project)
    users: ProjectUser[];

    @ManyToOne(type => User, user => user.responsibleFor, { nullable: false })
    responsibleUser: User;
}
