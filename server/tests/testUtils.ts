import { Response, SuperTest, Test } from 'supertest';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';

const getToken = (id: number, admin: boolean): string => {
    return jwt.sign({
        id,
        admin
    }, config.get('jwtSecret'));
};

export const AUTHORIZATION_HEADER_NAME = 'Authorization';
export const authorizationHeader = (admin: boolean = true, id: number = 1): string => `Bearer ${getToken(id, admin)}`;

const UNAUTHORIZED_MESSAGE_REG = /You do not have the required permission for this action/;

export const authenticateCheck = (request: SuperTest<Test>, method: ('get' | 'post' | 'put' | 'delete'), url: string): any => {
    const requestMethod = request[method]; // trying to type this statically seems almost impossible or I'm missing it

    it('should respond with 401 if user is not authenticated', async () => {
        const response: Response = await requestMethod.call(request, url);
        expect(response.status).toEqual(401);
    });
};

export const adminCheck = (request: SuperTest<Test>, method: ('get' | 'post' | 'put' | 'delete'), url: string): any => {
    const requestMethod = request[method]; // trying to type this statically seems almost impossible or I'm missing it

    authenticateCheck(request, method, url);
    it('should respond with 403 if user is not an admin', async () => {
        const response: Response = await requestMethod.call(request, url)
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader(false));
        expect(response.status).toEqual(403);
        expect(response.body.message).toMatch(UNAUTHORIZED_MESSAGE_REG);
    });
};

export const pathIdCheck = (request: SuperTest<Test>, method: ('get' | 'put' | 'delete'), url: string): any => {
    const requestMethod = request[method];

    it('should respond with status 404 if id is not a number', async () => {
        const response: Response = await requestMethod.call(request, url)
            .set(AUTHORIZATION_HEADER_NAME, authorizationHeader());
        expect(response.status).toBe(404);
    });
};
