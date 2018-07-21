import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    admin: boolean;
}
