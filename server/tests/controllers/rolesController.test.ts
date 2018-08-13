import { agent, Response, SuperTest, Test } from 'supertest';
import { getRepository, createConnection, Connection } from 'typeorm';
import app from '@server/app';
import { TeamRole } from '@server/entities/TeamRole';
import { adminCheck, authorizationHeader, AUTHORIZATION_HEADER_NAME, pathIdCheck } from '../testUtils';

const request: SuperTest<Test> = agent(app);

describe('GET /roles', () => {
    adminCheck(request, 'get', '/roles');
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
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader());
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
    adminCheck(request, 'post', '/roles');
    it('should return status 400 if request body is invalid', async () => {
        // uses utils/validations/role to verify request body, which has been tested
        const response: Response = await request
            .post('/roles')
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader())
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
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader())
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

    adminCheck(request, 'get', '/roles/1');
    pathIdCheck(request, 'get', '/roles/abc');
    it('should return status 404 if role doesn\'t exist', async () => {
        const response: Response = await request
            .get(`/roles/1`)
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader());
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
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader());
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

    adminCheck(request, 'put', '/roles/1');
    pathIdCheck(request, 'put', '/roles/abc');
    it('should return status 404 if role doesn\'t exist', async () => {
        const response: Response = await request
            .put(`/roles/1`)
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader());
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
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader())
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
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader())
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

    adminCheck(request, 'delete', '/roles/1');
    pathIdCheck(request, 'delete', '/roles/abc');
    it('should return status 404 if role doesn\'t exist', async () => {
        const response: Response = await request
            .delete(`/roles/1`)
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader());
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
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader());
        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/Role was deleted successfully/);
        // DB verification
        const found = await repository.findOne(saved.id);
        expect(found).toBeFalsy();
    });
});
