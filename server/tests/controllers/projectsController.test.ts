import { agent, Response, SuperTest, Test } from 'supertest';
import { getRepository, createConnection, Connection } from 'typeorm';
import app from '@server/app';
import { TeamRole } from '@server/entities/TeamRole';
import { adminCheck, authorizationHeader, AUTHORIZATION_HEADER_NAME, pathIdCheck } from '../testUtils';
import { Project } from '@server/entities/Project';
import { User } from '@server/entities/User';
import {ProjectUser} from '@server/entities/ProjectUser';

const request: SuperTest<Test> = agent(app);

const createUser = (name: string, surname: string, email: string, password: string, admin: boolean): User => {
    const user = new User();
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.password = password;
    user.admin = admin;
    return user;
};

const createRole = (name: string): TeamRole => {
    const role = new TeamRole();
    role.name = name;
    return role;
};

const createProject = (name: string, deadline: string, open: boolean, responsibleUser: User): Project => {
    const project = new Project();
    project.name = name;
    project.deadline = new Date(deadline);
    project.open = open;
    project.responsibleUser = responsibleUser;
    return project;
};

const createProjectUser = (user: User, project: Project, roles: TeamRole[]): ProjectUser => {
    const projectUser = new ProjectUser();
    projectUser.user = user;
    projectUser.project = project;
    projectUser.roles = roles;
    return projectUser;
};

describe('GET /projects', () => {
    let connection: Connection;

    async function setUp() {
        try {
            connection = await createConnection();
        } catch (error) {
            console.log('Error while connecting to the test database', error);
        }

        try {
            const userRepository = getRepository(User);
            const roleRepository = getRepository(TeamRole);
            const projectRepository = getRepository(Project);
            const projectUserRepository = getRepository(ProjectUser);

            // password should be hashed but we don't need that at the DB level and we're not gonna login with the user
            const user1 = createUser('John', 'Smith', 'john@qappa.net', 'password', false);
            const user2 = createUser('Jane', 'Smith', 'jane@qappa.net', 'password', true);
            const [john, jane] = await userRepository.save([user1, user2]);

            const role1 = createRole('Developer');
            const role2 = createRole('Tester');
            const [developer, tester] = await roleRepository.save([role1, role2]);

            const project1 = createProject('Test Project', '2019-05-27', true, john);
            const project = await projectRepository.save(project1);

            const projectUser1 = createProjectUser(john, project, [developer]);
            const projectUser2 = createProjectUser(jane, project, [developer, tester]);

            await projectUserRepository.save([projectUser1, projectUser2]);

            return { john, jane, developer, tester, project };
        } catch (error) {
            console.log('Error while setting up the test database', error);
        }
    }

    adminCheck(request, 'get', '/projects');
    it('should respond with status 200 and project array', async () => {
        const { john, jane, developer, tester, project } = await setUp();
        const response: Response = await request
            .get('/projects')
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader());
        expect(response.status).toBe(200);
        const body = response.body;
        expect(Array.isArray(body)).toBe(true);
        expect(body).toHaveLength(1);
        const bodyProject = body[0];
        expect(bodyProject).toMatchObject({
            id: project.id,
            name: project.name,
            deadline: project.deadline,
            open: project.open,
            responsibleUser: {
                id: john.id,
                name: john.name,
                surname: john.surname
            },
            members: expect.arrayContaining([
                {
                    user: {
                        id: john.id,
                        name: john.name,
                        surname: john.surname
                    },
                    roles: [
                        {
                            id: developer.id,
                            name: developer.name
                        }
                    ]
                },
                {
                    user: {
                        id: jane.id,
                        name: jane.name,
                        surname: jane.surname
                    },
                    roles: [
                        {
                            id: developer.id,
                            name: developer.name
                        },
                        {
                            id: tester.id,
                            name: tester.name
                        }
                    ]
                }
            ])
        });

        await connection.dropDatabase();
        await connection.close();
    });
});
