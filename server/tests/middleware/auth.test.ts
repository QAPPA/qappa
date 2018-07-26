import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { authenticate } from '@server/middleware/auth';

describe('auth middleware', () => {
    it('should respond with 401 if no authorization header is supplied', () => {
        const req = {
            headers: {}
        };
        const res = {
            end: jest.fn(),
            statusCode: undefined
        };
        const next = jest.fn();
        // @ts-ignore
        authenticate(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(401);
    });

    it('should respond with 401 if authorization header with wrong schema is supplied', () => {
        const req = {
            headers: {
                authorization: 'blah'
            }
        };
        const res = {
            end: jest.fn(),
            statusCode: undefined
        };
        const next = jest.fn();
        // @ts-ignore
        authenticate(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(401);
    });

    it('should respond with 401 if malformed JWT token is supplied', () => {
        const req = {
            headers: {
                authorization: 'Bearer blah'
            }
        };
        const res = {
            end: jest.fn(),
            statusCode: undefined
        };
        const next = jest.fn();
        // @ts-ignore
        authenticate(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(401);
    });

    it('should respond with 401 if JWT token signed with different secret is supplied', () => {
        const token = jwt.sign({}, 'thisIsNotTheCorrectSecret');
        const req = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };
        const res = {
            end: jest.fn(),
            statusCode: undefined
        };
        const next = jest.fn();
        // @ts-ignore
        authenticate(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(401);
    });

    it('should forward the request if correct JWT token is supplied', () => {
        const token = jwt.sign({}, config.get('jwtSecret'));
        const req = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };
        const res = {
            end: jest.fn()
        };
        const next = jest.fn();
        // @ts-ignore
        authenticate(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
