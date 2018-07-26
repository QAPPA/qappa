import { agent, Response, SuperTest, Test } from 'supertest';
import { getRepository, createConnection, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import app from '@server/app';
import { User } from '@server/entities/User';

const request: SuperTest<Test> = agent(app);

describe('GET /users', () => {
    it('should respond with status 401 if request is not authenticated', async () => {
        const response: Response = await request.get('/users');
        expect(response.status).toBe(401);
    });

    it('should respond with status 200 for valid request', async () => {
        const token = jwt.sign({}, config.get('jwtSecret'));
        const response: Response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.text).toMatch(/Sending all users/);
    });
});
