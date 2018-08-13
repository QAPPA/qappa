import { validateCreate, validateEdit } from '@server/utils/validations/project';

describe('Project creating validation', () => {
    describe('should return error if', () => {
        describe('name', () => {
            describe('is not a string', () => {
                it('undefined', () => {

                });
                it('null', () => {

                });
                it('different type', () => {

                });
            });
            it('is more than 100 characters long', () => {

            });
            it('is not specified', () => {

            });
        });
        describe('deadline', () => {
            describe('is not a date', () => {
                it('undefined', () => {

                });
                it('null', () => {

                });
                it('different type', () => {

                });
                it('wrong format', () => {

                });
            });
            it('is in past', () => {

            });
            it('is not specified', () => {

            });
        });
        describe('responsibleUserId', () => {
            describe('is not a number', () => {
                it('undefined', () => {

                });
                it('null', () => {

                });
                it('different type', () => {

                });
            });
            it('is less than 0', () => {

            });
            it('is not specified', () => {

            });
        });
        describe('members', () => {
            describe('is not an array', () => {
                it('undefined', () => {

                });
                it('null', () => {

                });
                it('different type', () => {

                });
                it('object', () => {

                });
            });
            describe('array contents', () => {
                describe('don\'t have required format', () => {
                    describe('userId', () => {
                        describe('is not a number', () => {
                            it('undefined', () => {

                            });
                            it('null', () => {

                            });
                            it('different type', () => {

                            });
                        });
                        it('is less than 0', () => {

                        });
                        it('is not specified', () => {

                        });
                    });
                    describe('roleIds', () => {
                        describe('is not an array', () => {
                            it('undefined', () => {

                            });
                            it('null', () => {

                            });
                            it('different type', () => {

                            });
                            it('object', () => {

                            });
                        });
                        describe('array contents don\'t have required format', () => {
                            describe('is not a number', () => {
                                it('undefined', () => {

                                });
                                it('null', () => {

                                });
                                it('different type', () => {

                                });
                            });
                            it('is less than 0', () => {

                            });
                            it('is not unique', () => {

                            });
                        });
                        it('is not passed', () => {

                        });
                        it('is empty', () => {

                        });
                    });
                });
                it('are not unique by the userId property', () => {

                });
            });
            it('is not passed', () => {

            });
        });
    });
    describe('should return null error if', () => {
        it('members was specified', () => {

        });
        it('members was not specified', () => {

        });
    });
});

describe('Project edit validation', () => {
    describe('should return error if', () => {
        describe('name', () => {
            describe('is not a string', () => {
                it('undefined', () => {

                });
                it('null', () => {

                });
                it('different type', () => {

                });
            });
            it('is more than 100 characters long', () => {

            });
            it('is not specified', () => {

            });
        });
        describe('deadline', () => {
            describe('is not a date', () => {
                it('undefined', () => {

                });
                it('null', () => {

                });
                it('different type', () => {

                });
                it('wrong format', () => {

                });
            });
            it('is in past', () => {

            });
            it('is not specified', () => {

            });
        });
        describe('responsibleUserId', () => {
            describe('is not a number', () => {
                it('undefined', () => {

                });
                it('null', () => {

                });
                it('different type', () => {

                });
            });
            it('is less than 0', () => {

            });
            it('is not specified', () => {

            });
        });
        describe('members', () => {
            describe('is not an array', () => {
                it('undefined', () => {

                });
                it('null', () => {

                });
                it('different type', () => {

                });
                it('object', () => {

                });
            });
            describe('array contents', () => {
                describe('don\'t have required format', () => {
                    describe('userId', () => {
                        describe('is not a number', () => {
                            it('undefined', () => {

                            });
                            it('null', () => {

                            });
                            it('different type', () => {

                            });
                        });
                        it('is less than 0', () => {

                        });
                        it('is not specified', () => {

                        });
                    });
                    describe('roleIds', () => {
                        describe('is not an array', () => {
                            it('undefined', () => {

                            });
                            it('null', () => {

                            });
                            it('different type', () => {

                            });
                            it('object', () => {

                            });
                        });
                        describe('array contents don\'t have required format', () => {
                            describe('is not a number', () => {
                                it('undefined', () => {

                                });
                                it('null', () => {

                                });
                                it('different type', () => {

                                });
                            });
                            it('is less than 0', () => {

                            });
                            it('is not unique', () => {

                            });
                        });
                        it('is not passed', () => {

                        });
                        it('is empty', () => {

                        });
                    });
                });
                it('are not unique by the userId property', () => {

                });
            });
            it('is not passed', () => {

            });
        });
        describe('open', () => {
            describe('is not a boolean', () => {
                it('undefined', () => {

                });
                it('null', () => {

                });
                it('different type', () => {

                });
            });
            it('is not specified', () => {

            });
        });
    });
    describe('should return null error if', () => {
        it('members was specified', () => {

        });
        it('members was not specified', () => {

        });
    });
});
