import { agent, SuperTest, Test } from 'supertest';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import app from '../../src/app';
import { User } from '../../src/entities/User';

const request: SuperTest<Test> = agent(app);

describe('POST /login', () => {
    beforeAll(async () => {
        const repository = getRepository(User);
        const user = new User();
        user.email = 'test@qappa.net';
        user.admin = true;
        user.password = await bcrypt.hash('password', 10);
        await repository.save(user);
    });

    afterAll(async () => {
        const repository = getRepository(User);
        await repository.delete({
            email: 'test@qappa.net'
        });
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
