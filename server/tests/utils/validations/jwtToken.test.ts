import { validate } from '@server/utils/validations/jwtToken';

describe('JWT Token payload validation', () => {
    let id;
    let admin;

    beforeEach(() => {
        id = 1;
        admin = true;
    });

    describe('should return error if id is not a number', () => {
        it('undefined', () => {
            id = undefined;
            const { error } = validate({
                id,
                admin
            });
            expect(error).toBeTruthy();
        });
        it('null', () => {
            id = null;
            const { error } = validate({
                id,
                admin
            });
            expect(error).toBeTruthy();
        });
        it('different type', () => {
            id = 'string';
            const { error } = validate({
                id,
                admin
            });
            expect(error).toBeTruthy();
        });
    });
    it('should return error if id is less than 0', () => {
        id = -1;
        const { error } = validate({
            id,
            admin
        });
        expect(error).toBeTruthy();
    });
    it('should return error if id is not supplied', () => {
        const { error } = validate({
            admin
        });
        expect(error).toBeTruthy();
    });
    describe('should return error if admin is not a boolean', () => {
        it('undefined', () => {
            admin = undefined;
            const { error } = validate({
                id,
                admin
            });
            expect(error).toBeTruthy();
        });
        it('null', () => {
            admin = null;
            const { error } = validate({
                id,
                admin
            });
            expect(error).toBeTruthy();
        });
        it('different type', () => {
            admin = 'string';
            const { error } = validate({
                id,
                admin
            });
            expect(error).toBeTruthy();
        });
    });
    it('should return error if admin is not supplied', () => {
        const { error } = validate({
            id
        });
        expect(error).toBeTruthy();
    });
    it('should return error if empty object is supplied', () => {
        const { error } = validate({});
        expect(error).toBeTruthy();
    });
    it('should not return error if payload is correct', () => {
        const { error } = validate({
            id,
            admin
        });
        expect(error).toBeFalsy();
    });
    it('should allow other fields in payload', () => {
        const { error } = validate({
            id,
            admin,
            something: 'else'
        });
        expect(error).toBeFalsy();
    });
});
