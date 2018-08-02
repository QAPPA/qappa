import { agent, Response, SuperTest, Test } from 'supertest';
import { getRepository, createConnection, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import app from '@server/app';
import { User } from '@server/entities/User';

const request: SuperTest<Test> = agent(app);

describe('POST /auth/login', () => {
    let connection: Connection;
    let savedUser: User;

    beforeAll(async () => {
        try {
            connection = await createConnection();
            const repository = getRepository(User);
            const user = new User();
            user.email = 'test@qappa.net';
            user.admin = true;
            user.password = await bcrypt.hash('password', 10);
            savedUser = await repository.save(user);
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
        it('if invalid body was supplied', async () => {
            // uses validate() method which has already been tested
            const response: Response = await request
                .post('/auth/login')
                .send({
                    email: 'this is not a valid email',
                    password: ''
                });
            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/Validation error/);
        });
        it('if user was not found', async () => {
            const response: Response = await request
                .post('/auth/login')
                .send({
                    email: 'nonexistent@qappa.net',
                    password: 'password'
                });
            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/Invalid email or password/);
        });
        it('if user password doesn\'t match', async () => {
            const response: Response = await request
                .post('/auth/login')
                .send({
                    email: 'test@qappa.net',
                    password: 'wrongPassword'
                });
            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/Invalid email or password/);
        });
    });
    it('should respond with status 200 and JWT token in response if login is successful', async () => {
        const response: Response = await request
            .post('/auth/login')
            .send({
                email: 'test@qappa.net',
                password: 'password'
            });
        expect(response.status).toBe(200);

        const { token } = response.body;
        const payload = await jwt.verify(token, config.get('jwtSecret'));
        expect(payload).toMatchObject({
            id: savedUser.id,
            admin: savedUser.admin
        });
    });
});
