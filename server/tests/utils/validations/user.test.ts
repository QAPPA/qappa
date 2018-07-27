import { validate } from '@server/utils/validations/user';

describe('Joi User validation', () => {
    let email;
    let password;

    beforeEach(() => {
        email = 'chizu@qappa.net';
        password = 'password';
    });

    describe('Email validation', () => {
        describe('it should return error if it is not a string', () => {
            it('undefined', () => {
                email = undefined;
                const { error } = validate({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('null', () => {
                email = null;
                const { error } = validate({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('wrong type', () => {
                email = 0;
                const { error } = validate({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
        });
        it('should return error if it is less than 5 characters long', () => {
            email = Array(5).join('a');
            const { error } = validate({
                email,
                password
            });
            expect(error).toBeTruthy();
        });
        it('should return error if it is more than 100 characters long', () => {
            email = Array(102).join('a');
            const { error } = validate({
                email,
                password
            });
            expect(error).toBeTruthy();
        });
        it('should return error if it is not passed', () => {
            const { error } = validate({
                password
            });
            expect(error).toBeTruthy();
        });
        it('should return error if it is not a valid email', () => {
            email = 'this is not a valid email';
            const { error } = validate({
                email,
                password
            });
            expect(error).toBeTruthy();
        });
    });
    describe('Password validation', () => {
        describe('it should return error if it is not a string', () => {
            it('undefined', () => {
                password = undefined;
                const { error } = validate({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('null', () => {
                password = null;
                const { error } = validate({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('wrong type', () => {
                password = 0;
                const { error } = validate({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
        });
        it('should return error if it is less than 5 characters long', () => {
            password = Array(5).join('a');
            const { error } = validate({
                email,
                password
            });
            expect(error).toBeTruthy();
        });
        it('should return error if it is more than 255 characters long', () => {
            password = Array(257).join('a');
            const { error } = validate({
                email,
                password
            });
            expect(error).toBeTruthy();
        });
        it('should return error if it is not passed', () => {
            const { error } = validate({
                email
            });
            expect(error).toBeTruthy();
        });
    });
    it('should return null error if email and password are valid', () => {
        const { error } = validate({
            email,
            password
        });
        expect(error).toBeNull();
    });
});
