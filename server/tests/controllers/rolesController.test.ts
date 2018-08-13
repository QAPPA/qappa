import { agent, Response, SuperTest, Test } from 'supertest';
import { getRepository, createConnection, Connection } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import app from '@server/app';
import { TeamRole } from '@server/entities/TeamRole';

const request: SuperTest<Test> = agent(app);

const getToken = (admin: boolean): string => {
    return jwt.sign({
        admin,
        id: 1
    }, config.get('jwtSecret'));
};

const AUTH_HEADER_NAME = 'Authorization';
const authHeader = (admin: boolean = true): string => `Bearer ${getToken(admin)}`;

const UNAUTHORIZED_MESSAGE_REG = /You do not have the required permission for this action/;

const adminCheck = (method: ('get' | 'post' | 'put' | 'delete'), url: string): any => {
    const requestMethod = request[method]; // trying to type this statically seems almost impossible or I'm missing it

    it('should respond with 401 if user is not authenticated', async () => {
        const response: Response = await requestMethod.call(request, url);
        expect(response.status).toEqual(401);
    });
    it('should respond with 403 if user is not an admin', async () => {
        const response: Response = await requestMethod.call(request, url)
            .set(AUTH_HEADER_NAME, authHeader(false));
        expect(response.status).toEqual(403);
        expect(response.body.message).toMatch(UNAUTHORIZED_MESSAGE_REG);
    });
};

const pathIdCheck = (method: ('get' | 'put' | 'delete'), url: string): any => {
    const requestMethod = request[method];

    it('should respond with status 404 if id is not a number', async () => {
        const response: Response = await requestMethod.call(request, url)
            .set(AUTH_HEADER_NAME, authHeader());
        expect(response.status).toBe(404);
    });
};

describe('GET /roles', () => {
    adminCheck('get', '/roles');
    it('should respond with status 200 and array of team roles if request is valid', async () => {
        const connection: Connection = await createConnection();
        const repository = getRepository(TeamRole);

        const role1 = new TeamRole();
        role1.name = 'Developer';
        const savedRole1 = await repository.save(role1);

        const role2 = new TeamRole();
        role2.name = 'Tester';
        await repository.save(role2);

        const response: Response = await request
            .get('/roles')
            .set(AUTH_HEADER_NAME, authHeader());
        expect(response.status).toEqual(200);
        const body = response.body;
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(2);
        expect(body[0]).toMatchObject({
            id: savedRole1.id,
            name: savedRole1.name
        });

        await connection.dropDatabase();
        await connection.close();
    });
});

describe('POST /roles', () => {
    adminCheck('post', '/roles');
    it('should return status 400 if request body is invalid', async () => {
        // uses utils/validations/role to verify request body, which has been tested
        const response: Response = await request
            .post('/roles')
            .set(AUTH_HEADER_NAME, authHeader())
            .send({});
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch(/Name of the role is required/);
    });
    it('should return status 201 and created role in response if request is valid', async () => {
        const connection: Connection = await createConnection();
        const repository = getRepository(TeamRole);

        const name = 'Developer';
        const response: Response = await request
            .post('/roles')
            .set(AUTH_HEADER_NAME, authHeader())
            .send({ name });
        // response verification
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            name,
            id: expect.any(Number)
        });
        // DB verification
        const found = await repository.findOne({ name });
        expect(found).toMatchObject({
            name,
            id: expect.any(Number)
        });

        await connection.dropDatabase();
        await connection.close();
    });
});

describe('GET /roles/:id', () => {
    let connection: Connection;

    beforeAll(async () => {
        try {
            connection = await createConnection();
        } catch (error) {
            console.log('Error while connecting to test database', error);
        }
    });

    afterAll(async () => {
        try {
            await connection.dropDatabase();
            await connection.close();
        } catch (error) {
            console.log('Error while disconnecting from test database', error);
        }
    });

    adminCheck('get', '/roles/1');
    pathIdCheck('get', '/roles/abc');
    it('should return status 404 if role doesn\'t exist', async () => {
        const response: Response = await request
            .get(`/roles/1`)
            .set(AUTH_HEADER_NAME, authHeader());
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/Role doesn't exist/);
    });
    it('should return status 200 and detail of the role', async () => {
        const repository = getRepository(TeamRole);

        const role = new TeamRole();
        role.name = 'Developer';
        const saved = await repository.save(role);

        const response: Response = await request
            .get(`/roles/${saved.id}`)
            .set(AUTH_HEADER_NAME, authHeader());
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            id: saved.id,
            name: saved.name
        });

        await repository.delete(saved.id);
    });
});

describe('PUT /roles/:id', () => {
    let connection: Connection;

    beforeAll(async () => {
        try {
            connection = await createConnection();
        } catch (error) {
            console.log('Error while connecting to test database', error);
        }
    });

    afterAll(async () => {
        try {
            await connection.dropDatabase();
            await connection.close();
        } catch (error) {
            console.log('Error while disconnecting from test database', error);
        }
    });

    adminCheck('put', '/roles/1');
    pathIdCheck('put', '/roles/abc');
    it('should return status 404 if role doesn\'t exist', async () => {
        const response: Response = await request
            .put(`/roles/1`)
            .set(AUTH_HEADER_NAME, authHeader());
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/Role doesn't exist/);
    });
    it('should return status 400 if request body is invalid', async () => {
        const repository = getRepository(TeamRole);

        const role = new TeamRole();
        role.name = 'Developer';
        const saved = await repository.save(role);

        const response: Response = await request
            .put(`/roles/${saved.id}`)
            .set(AUTH_HEADER_NAME, authHeader())
            .send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/Name of the role is required/);

        await repository.delete(saved.id);
    });
    it('should return status 200 and detail of the role', async () => {
        const repository = getRepository(TeamRole);

        const role = new TeamRole();
        role.name = 'Developer';
        const saved = await repository.save(role);

        const name = 'Tester';
        const response: Response = await request
            .put(`/roles/${saved.id}`)
            .set(AUTH_HEADER_NAME, authHeader())
            .send({ name });
        // response verification
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            name,
            id: saved.id
        });
        // DB verification
        const found = await repository.findOne(saved.id);
        expect(found.name).toEqual(name);

        await repository.delete(saved.id);
    });
});

describe('DELETE /roles/:id', () => {
    let connection: Connection;

    beforeAll(async () => {
        try {
            connection = await createConnection();
        } catch (error) {
            console.log('Error while connecting to test database', error);
        }
    });

    afterAll(async () => {
        try {
            await connection.dropDatabase();
            await connection.close();
        } catch (error) {
            console.log('Error while disconnecting from test database', error);
        }
    });

    adminCheck('delete', '/roles/1');
    pathIdCheck('delete', '/roles/abc');
    it('should return status 404 if role doesn\'t exist', async () => {
        const response: Response = await request
            .delete(`/roles/1`)
            .set(AUTH_HEADER_NAME, authHeader());
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/Role doesn't exist/);
    });
    it('should return status 200 if role exists', async () => {
        const repository = getRepository(TeamRole);

        const role = new TeamRole();
        role.name = 'Developer';
        const saved = await repository.save(role);

        const response: Response = await request
            .delete(`/roles/${saved.id}`)
            .set(AUTH_HEADER_NAME, authHeader());
        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/Role was deleted successfully/);
        // DB verification
        const found = await repository.findOne(saved.id);
        expect(found).toBeFalsy();
    });
});
