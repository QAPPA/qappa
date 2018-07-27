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

    it('should respond with status 200 for valid request', async () => {
        const token = jwt.sign({ id: 1, admin: true }, config.get('jwtSecret'));
        const response: Response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/Sending all users/);
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

    it('should respond with status 400 if request body is invalid', async () => {
        // validate() has already been tested
        const response: Response = await request.post('/users').send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/Email and password must be supplied/);
    });

    it('should save new user to DB if request is valid', async () => {
        const email = 'test1@qappa.net';
        const response: Response = await request
            .post('/users')
            .send({
                email,
                password: 'password'
            });
        expect(response.status).toBe(200);

        const repository = getRepository(User);
        const user = await repository.findOne({ email });
        expect(user).toBeTruthy();
        expect(user).toMatchObject({
            email,
            admin: true
        });
    });

    it('should respond with status 200 and user if request is valid', async () => {
        const response: Response = await request
            .post('/users')
            .send({
                email: 'test@qappa.net',
                password: 'password'
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email', 'test@qappa.net');
        expect(response.body).toHaveProperty('admin', true);
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
        user.email = 'test@qappa.net';
        user.admin = true;
        user.password = await bcrypt.hash('password', 10);
        const savedUser = await repository.save(user);

        const token = jwt.sign(_.pick(savedUser, ['id', 'admin']), config.get('jwtSecret'));
        const response: Response = await request
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            id: savedUser.id,
            email: savedUser.email,
            admin: savedUser.admin
        });

        await repository.delete({ id: savedUser.id });
    });
});
