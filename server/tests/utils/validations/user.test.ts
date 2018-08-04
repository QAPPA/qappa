import { validateLogin, validateRegister } from '@server/utils/validations/user';

describe('User login validation', () => {
    let email;
    let password;

    beforeEach(() => {
        email = 'chizu@qappa.net';
        password = 'password';
    });

    describe('should return error', () => {
        describe('if email', () => {
            describe('is not a string', () => {
                it('undefined', () => {
                    email = undefined;
                    const { error } = validateLogin({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    email = null;
                    const { error } = validateLogin({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
                it('wrong type', () => {
                    email = 0;
                    const { error } = validateLogin({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is less than 5 characters long', () => {
                email = Array(5).join('a');
                const { error } = validateLogin({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('is more than 100 characters long', () => {
                email = Array(102).join('a');
                const { error } = validateLogin({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('is not passed', () => {
                const { error } = validateLogin({
                    password
                });
                expect(error).toBeTruthy();
            });
            it('is not a valid email', () => {
                email = 'this is not a valid email';
                const { error } = validateLogin({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
        });
        describe('if password', () => {
            describe('is not a string', () => {
                it('undefined', () => {
                    password = undefined;
                    const { error } = validateLogin({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    password = null;
                    const { error } = validateLogin({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
                it('wrong type', () => {
                    password = 0;
                    const { error } = validateLogin({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is less than 5 characters long', () => {
                password = Array(5).join('a');
                const { error } = validateLogin({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('is more than 255 characters long', () => {
                password = Array(257).join('a');
                const { error } = validateLogin({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('is not passed', () => {
                const { error } = validateLogin({
                    email
                });
                expect(error).toBeTruthy();
            });
        });
    });
    it('should return null error if email and password are valid', () => {
        const { error } = validateLogin({
            email,
            password
        });
        expect(error).toBeNull();
    });
});

describe('User register validation', () => {
    let email;
    let password;

    beforeEach(() => {
        email = 'chizu@qappa.net';
        password = 'password';
    });

    describe('should return error', () => {
        describe('if email', () => {
            describe('is not a string', () => {
                it('undefined', () => {
                    email = undefined;
                    const { error } = validateRegister({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    email = null;
                    const { error } = validateRegister({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
                it('wrong type', () => {
                    email = 0;
                    const { error } = validateRegister({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is less than 5 characters long', () => {
                email = Array(5).join('a');
                const { error } = validateRegister({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('is more than 100 characters long', () => {
                email = Array(102).join('a');
                const { error } = validateRegister({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('is not passed', () => {
                const { error } = validateRegister({
                    password
                });
                expect(error).toBeTruthy();
            });
            it('is not a valid email', () => {
                email = 'this is not a valid email';
                const { error } = validateRegister({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
        });
        describe('if password', () => {
            describe('is not a string', () => {
                it('undefined', () => {
                    password = undefined;
                    const { error } = validateRegister({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    password = null;
                    const { error } = validateRegister({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
                it('wrong type', () => {
                    password = 0;
                    const { error } = validateRegister({
                        email,
                        password
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is less than 5 characters long', () => {
                password = Array(5).join('a');
                const { error } = validateRegister({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('is more than 255 characters long', () => {
                password = Array(257).join('a');
                const { error } = validateRegister({
                    email,
                    password
                });
                expect(error).toBeTruthy();
            });
            it('is not passed', () => {
                const { error } = validateRegister({
                    email
                });
                expect(error).toBeTruthy();
            });
        });
        describe('if admin is passed, but is not a boolean', () => {
            it('null', () => {
                const admin = null;
                const { error } = validateRegister({
                    email,
                    password,
                    admin
                });
                expect(error).toBeTruthy();
            });
            it('wrong type', () => {
                const admin = 0;
                const { error } = validateRegister({
                    email,
                    password,
                    admin
                });
                expect(error).toBeTruthy();
            });
        });
    });
    describe('should return null error', () => {
        it('if email and password are valid and admin was not specified', () => {
            const { error } = validateRegister({
                email,
                password
            });
            expect(error).toBeNull();
        });
        it('if email and password are valid and admin was specified', () => {
            const admin = true;
            const { error } = validateRegister({
                email,
                password,
                admin
            });
            expect(error).toBeNull();
        });
    });
});
