import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { authenticate, authorize } from '@server/middleware/auth';

describe('authenticate middleware', () => {
    describe('should respond with status code 401', () => {
        describe('if authorization header', () => {
            it('was not supplied', () => {
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
            it('had wrong schema', () => {
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
        });
        describe('if JWT token', () => {
            it('is malformed', () => {
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
            it('is signed with different secret', () => {
                const token = jwt.sign({ id: 1, admin: true }, 'thisIsNotTheCorrectSecret');
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
            it('has invalid payload', () => {
                // uses utils/validations/jwtToken.validate() which has already been tested
                const token = jwt.sign({}, config.get('jwtSecret'));
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
        });
    });
    it('should forward the request if JWT token is correct', () => {
        const token = jwt.sign({ id: 1, admin: true }, config.get('jwtSecret'));
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

describe('authorize middleware', () => {
    it('should respond with status code 403 if user is not an admin', () => {
        // assume user went successfully through authenticate middleware and has user property set in request
        const req = {
            user: {
                id: 1,
                admin: false
            }
        };
        const res = {
            end: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();
        // @ts-ignore
        authorize(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({
            message: 'You do not have the required permission for this action'
        });
    });
    it('should forward the request if user is an admin', () => {
        // assume user went successfully through authenticate middleware and has user property set in request
        const req = {
            user: {
                id: 1,
                admin: true
            }
        };
        const res = {
            end: jest.fn(),
            statusCode: undefined
        };
        const next = jest.fn();
        // @ts-ignore
        authorize(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
