import { agent, SuperTest, Test } from 'supertest';
import { getRepository, createConnection, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import app from '@server/app';
import { User } from '@server/entities/User';

const request: SuperTest<Test> = agent(app);

describe('POST /login', () => {
    let connection: Connection;

    beforeAll(async () => {
        try {
            connection = await createConnection();
            const repository = getRepository(User);
            const user = new User();
            user.email = 'test@qappa.net';
            user.admin = true;
            user.password = await bcrypt.hash('password', 10);
            await repository.save(user);
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

    it('should respond with status 400 if invalid body was supplied', () => {
        // uses validate() method which has already been tested
        request.post('/login')
            .send({
                email: 'this is not a valid email',
                password: 0
            })
            .expect(400);
    });
});
