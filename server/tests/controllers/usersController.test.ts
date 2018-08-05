import { agent, Response, SuperTest, Test } from 'supertest';
import { getRepository, createConnection, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import * as _ from 'lodash';
import app from '@server/app';
import { User } from '@server/entities/User';

const request: SuperTest<Test> = agent(app);

describe('GET /users', () => {
    it('should respond with status 401 if request is not authenticated', async () => {
        const response: Response = await request.get('/users');
        expect(response.status).toBe(401);
    });

    it('should respond with status 200 and user array for valid request', async () => {
        const connection: Connection = await createConnection();
        const repository = getRepository(User);

        const user1 = new User();
        user1.name = 'John';
        user1.surname = 'Smith';
        user1.email = 'test@qappa.net';
        user1.admin = true;
        user1.password = await bcrypt.hash('password', 10);
        await repository.save(user1);

        const user2 = new User();
        user2.name = 'Jane';
        user2.surname = 'Smith';
        user2.email = 'test2@qappa.net';
        user2.admin = true;
        user2.password = await bcrypt.hash('password', 10);
        await repository.save(user2);

        const token = jwt.sign({ id: 1, admin: true }, config.get('jwtSecret'));
        const response: Response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.users).toHaveLength(2);

        const singleUser = response.body.users[0];
        expect(singleUser).toHaveProperty('id');
        expect(singleUser).toHaveProperty('email');
        expect(singleUser).toHaveProperty('admin');

        await connection.dropDatabase();
        await connection.close();
    });
});

describe('POST /users', () => {
    let connection: Connection;

    beforeAll(async () => {
        try {
            connection = await createConnection();
        } catch (error) {
            console.log(error);
            throw new Error('Error while connecting to database');
        }
    });

    afterAll(async () => {
        try {
            await connection.dropDatabase();
            await connection.close();
        } catch (error) {
            console.log(error);
            throw new Error('Error while disconnecting from database');
        }
    });

    describe('should respond with status code 400', () => {
        it('if request body is invalid', async () => {
            // validateRegister() has already been tested
            const response: Response = await request.post('/users').send({});
            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/Name, surname, email and password must be supplied/);
        });
        it('if user already exists', async () => {
            const repository = getRepository(User);
            const user = new User();
            user.name = 'John';
            user.surname = 'Smith';
            user.email = 'test@qappa.net';
            user.admin = true;
            user.password = await bcrypt.hash('password', 10);
            await repository.save(user);

            const response: Response = await request
                .post('/users')
                .send({
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    password: 'password'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/User with given email already exists/);

            await repository.clear();
        });
    });
    describe('should respond with status code 200 and user in response if request is valid', () => {
        it('if admin property was not specified', async () => {
            const name = 'John';
            const surname = 'Smith';
            const email = 'test@qappa.net';
            const response: Response = await request
                .post('/users')
                .send({
                    name,
                    surname,
                    email,
                    password: 'password'
                });
            // response verification
            expect(response.status).toBe(200);
            const body = response.body;
            expect(body).toHaveProperty('id');
            expect(body).toHaveProperty('name', name);
            expect(body).toHaveProperty('surname', surname);
            expect(body).toHaveProperty('email', email);
            expect(body).toHaveProperty('admin', true);

            // DB verification
            const repository = getRepository(User);
            const user = await repository.findOne({ email });
            expect(user).toBeTruthy();
            expect(user).toMatchObject({
                name,
                surname,
                email,
                admin: true
            });
            await repository.clear();
        });
        it('if admin property was specified', async () => {
            const name = 'John';
            const surname = 'Smith';
            const email = 'test@qappa.net';
            const response: Response = await request
                .post('/users')
                .send({
                    name,
                    surname,
                    email,
                    password: 'password',
                    admin: false
                });
            // response verification
            expect(response.status).toBe(200);
            const body = response.body;
            expect(body).toHaveProperty('id');
            expect(body).toHaveProperty('name', name);
            expect(body).toHaveProperty('surname', surname);
            expect(body).toHaveProperty('email', email);
            expect(body).toHaveProperty('admin', false);

            // DB verification
            const repository = getRepository(User);
            const user = await repository.findOne({ email });
            expect(user).toBeTruthy();
            expect(user).toMatchObject({
                name,
                surname,
                email,
                admin: false
            });
            await repository.clear();
        });
    });
});

describe('GET /users/me', () => {
    let connection: Connection;

    beforeAll(async () => {
        try {
            connection = await createConnection();
        } catch (error) {
            console.log(error);
            throw new Error('Error while connecting to database');
        }
    });

    afterAll(async () => {
        try {
            await connection.dropDatabase();
            await connection.close();
        } catch (error) {
            console.log(error);
            throw new Error('Error while disconnecting from database');
        }
    });

    it('should respond with status 401 if request is not authenticated', async () => {
        const response: Response = await request.get('/users/me');
        expect(response.status).toBe(401);
    });

    it('should respond with status 400 if request user doesn\'t exist', async () => {
        const token = jwt.sign({ id: 1, admin: true }, config.get('jwtSecret'));
        const response: Response = await request
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/Authentication failed/);
    });

    it('should respond with status 200 and user if request is valid', async () => {
        const repository = getRepository(User);
        const user = new User();
        user.name = 'John';
        user.surname = 'Smith';
        user.email = 'test@qappa.net';
        user.admin = true;
        user.password = await bcrypt.hash('password', 10);
        const savedUser = await repository.save(user);

        const token = jwt.sign(_.pick(savedUser, ['id', 'admin']), config.get('jwtSecret'));
        const response: Response = await request
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
        const responseUser = response.body.user;
        expect(responseUser).toMatchObject({
            id: savedUser.id,
            name: savedUser.name,
            surname: savedUser.surname,
            email: savedUser.email,
            admin: savedUser.admin
        });

        await repository.clear();
    });
});
