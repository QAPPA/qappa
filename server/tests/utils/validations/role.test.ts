import { validate } from '@server/utils/validations/role';

describe('Team role validation', () => {
    describe('should return error if name', () => {
        describe('is not a string', () => {
            it('undefined', () => {
                const { error } = validate({
                    name: undefined
                });
                expect(error).toBeTruthy();
            });
            it('null', () => {
                const { error } = validate({
                    name: null
                });
                expect(error).toBeTruthy();
            });
            it('different type', () => {
                const { error } = validate({
                    name: 0
                });
                expect(error).toBeTruthy();
            });
        });
        it('is more than 100 characters long', () => {
            const { error } = validate({
                name: Array(102).join('a')
            });
            expect(error).toBeTruthy();
        });
        it('is not supplied', () => {
            const { error } = validate({});
            expect(error).toBeTruthy();
        });
    });
    it('should return null error if name is correct', () => {
        const { error } = validate({
            name: 'Developer'
        });
        expect(error).toBeNull();
    });
});
