import { validateCreate, validateEdit } from '@server/utils/validations/project';
import * as moment from 'moment';

describe('Project creating validation', () => {
    let name;
    let deadline;
    let responsibleUserId;
    let userId1;
    let userId2;
    let roleIds1;
    let roleIds2;

    beforeEach(() => {
        name = 'Project';
        deadline = moment().add(1, 'years').format('YYYY-MM-DD');
        responsibleUserId = 1;
        userId1 = 1;
        userId2 = 2;
        roleIds1 = [1, 2];
        roleIds2 = [3];
    });

    describe('should return error if', () => {
        describe('name', () => {
            describe('is not a string', () => {
                it('undefined', () => {
                    name = undefined;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    name = null;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('different type', () => {
                    name = 0;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is more than 100 characters long', () => {
                name = Array(102).join('a');
                const { error } = validateCreate({
                    name,
                    deadline,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
            it('is not specified', () => {
                const { error } = validateCreate({
                    deadline,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
        });
        describe('deadline', () => {
            describe('is not a date', () => {
                it('undefined', () => {
                    deadline = undefined;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    deadline = null;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('different type', () => {
                    // number might get interpreted as milliseconds or seconds from epoch, for string there is another test case
                    deadline = false;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('wrong format', () => {
                    deadline = 'abc';
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is in past', () => {
                deadline = moment().subtract(1, 'years').format('YYYY-MM-DD');
                const { error } = validateCreate({
                    name,
                    deadline,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
            it('is not specified', () => {
                const { error } = validateCreate({
                    name,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
        });
        describe('responsibleUserId', () => {
            describe('is not a number', () => {
                it('undefined', () => {
                    responsibleUserId = undefined;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    responsibleUserId = null;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('different type', () => {
                    responsibleUserId = 'string';
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is less than 0', () => {
                responsibleUserId = -1;
                const { error } = validateCreate({
                    name,
                    deadline,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
            it('is not specified', () => {
                const { error } = validateCreate({
                    name,
                    deadline,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
        });
        describe('members', () => {
            describe('is not an array', () => {
                it('undefined', () => {
                    const members = undefined;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    const members = null;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members
                    });
                    expect(error).toBeTruthy();
                });
                it('different type', () => {
                    const members = 'string';
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members
                    });
                    expect(error).toBeTruthy();
                });
                it('object', () => {
                    const members = {};
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members
                    });
                    expect(error).toBeTruthy();
                });
            });
            describe('array contents', () => {
                describe('don\'t have required format', () => {
                    describe('userId', () => {
                        describe('is not a number', () => {
                            it('undefined', () => {
                                userId1 = undefined;
                                const { error } = validateCreate({
                                    name,
                                    deadline,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('null', () => {
                                userId1 = null;
                                const { error } = validateCreate({
                                    name,
                                    deadline,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('different type', () => {
                                userId1 = 'string';
                                const { error } = validateCreate({
                                    name,
                                    deadline,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                        });
                        it('is less than 0', () => {
                            userId1 = -1;
                            const { error } = validateCreate({
                                name,
                                deadline,
                                responsibleUserId,
                                members: [
                                    {
                                        userId: userId1,
                                        roleIds: roleIds1
                                    }
                                ]
                            });
                            expect(error).toBeTruthy();
                        });
                        it('is not specified', () => {
                            const { error } = validateCreate({
                                name,
                                deadline,
                                responsibleUserId,
                                members: [
                                    {
                                        roleIds: roleIds1
                                    }
                                ]
                            });
                            expect(error).toBeTruthy();
                        });
                    });
                    describe('roleIds', () => {
                        describe('is not an array', () => {
                            it('undefined', () => {
                                roleIds1 = undefined;
                                const { error } = validateCreate({
                                    name,
                                    deadline,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('null', () => {
                                roleIds1 = null;
                                const { error } = validateCreate({
                                    name,
                                    deadline,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('different type', () => {
                                roleIds1 = 'string';
                                const { error } = validateCreate({
                                    name,
                                    deadline,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('object', () => {
                                roleIds1 = {};
                                const { error } = validateCreate({
                                    name,
                                    deadline,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                        });
                        describe('array contents don\'t have required format', () => {
                            describe('is not a number', () => {
                                it('undefined', () => {
                                    const role = undefined;
                                    const { error } = validateCreate({
                                        name,
                                        deadline,
                                        responsibleUserId,
                                        members: [
                                            {
                                                userId: userId1,
                                                roleIds: [role]
                                            }
                                        ]
                                    });
                                    expect(error).toBeTruthy();
                                });
                                it('null', () => {
                                    const role = null;
                                    const { error } = validateCreate({
                                        name,
                                        deadline,
                                        responsibleUserId,
                                        members: [
                                            {
                                                userId: userId1,
                                                roleIds: [role]
                                            }
                                        ]
                                    });
                                    expect(error).toBeTruthy();
                                });
                                it('different type', () => {
                                    const role = 'string';
                                    const { error } = validateCreate({
                                        name,
                                        deadline,
                                        responsibleUserId,
                                        members: [
                                            {
                                                userId: userId1,
                                                roleIds: [role]
                                            }
                                        ]
                                    });
                                    expect(error).toBeTruthy();
                                });
                            });
                            it('is less than 0', () => {
                                const role = -1;
                                const { error } = validateCreate({
                                    name,
                                    deadline,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: [role]
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('is not unique', () => {
                                const roleIds = [1, 1, 2];
                                const { error } = validateCreate({
                                    name,
                                    deadline,
                                    responsibleUserId,
                                    members: [
                                        {
                                            roleIds,
                                            userId: userId1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                        });
                        it('is not passed', () => {
                            const { error } = validateCreate({
                                name,
                                deadline,
                                responsibleUserId,
                                members: [
                                    {
                                        userId: userId1
                                    }
                                ]
                            });
                            expect(error).toBeTruthy();
                        });
                        it('is empty', () => {
                            const { error } = validateCreate({
                                name,
                                deadline,
                                responsibleUserId,
                                members: [
                                    {
                                        userId: userId1,
                                        roleIds: []
                                    }
                                ]
                            });
                            expect(error).toBeTruthy();
                        });
                    });
                });
                it('are not unique by the userId property', () => {
                    userId1 = userId2 = 1;
                    const { error } = validateCreate({
                        name,
                        deadline,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is not passed', () => {
                const { error } = validateCreate({
                    name,
                    deadline,
                    responsibleUserId
                });
                expect(error).toBeTruthy();
            });
        });
    });
    describe('should return null error if', () => {
        it('members were not empty', () => {
            const { error } = validateCreate({
                name,
                deadline,
                responsibleUserId,
                members: [
                    {
                        userId: userId1,
                        roleIds: roleIds1
                    },
                    {
                        userId: userId2,
                        roleIds: roleIds2
                    }
                ]
            });
            expect(error).toBeNull();
        });
        it('members were empty', () => {
            const { error } = validateCreate({
                name,
                deadline,
                responsibleUserId,
                members: []
            });
            expect(error).toBeNull();
        });
    });
});

describe('Project edit validation', () => {
    let name;
    let deadline;
    let open;
    let responsibleUserId;
    let userId1;
    let userId2;
    let roleIds1;
    let roleIds2;

    beforeEach(() => {
        name = 'Project';
        deadline = moment().add(1, 'years').format('YYYY-MM-DD');
        open = true;
        responsibleUserId = 1;
        userId1 = 1;
        userId2 = 2;
        roleIds1 = [1, 2];
        roleIds2 = [3];
    });

    describe('should return error if', () => {
        describe('name', () => {
            describe('is not a string', () => {
                it('undefined', () => {
                    name = undefined;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    name = null;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('different type', () => {
                    name = 0;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is more than 100 characters long', () => {
                name = Array(102).join('a');
                const { error } = validateEdit({
                    name,
                    deadline,
                    open,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
            it('is not specified', () => {
                const { error } = validateEdit({
                    deadline,
                    open,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
        });
        describe('deadline', () => {
            describe('is not a date', () => {
                it('undefined', () => {
                    deadline = undefined;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    deadline = null;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('different type', () => {
                    // number might get interpreted as milliseconds or seconds from epoch, for string there is another test case
                    deadline = false;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('wrong format', () => {
                    deadline = 'abc';
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is in past', () => {
                deadline = moment().subtract(1, 'years').format('YYYY-MM-DD');
                const { error } = validateEdit({
                    name,
                    deadline,
                    open,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
            it('is not specified', () => {
                const { error } = validateEdit({
                    name,
                    open,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
        });
        describe('responsibleUserId', () => {
            describe('is not a number', () => {
                it('undefined', () => {
                    responsibleUserId = undefined;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    responsibleUserId = null;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('different type', () => {
                    responsibleUserId = 'string';
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is less than 0', () => {
                responsibleUserId = -1;
                const { error } = validateEdit({
                    name,
                    deadline,
                    open,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
            it('is not specified', () => {
                const { error } = validateEdit({
                    name,
                    deadline,
                    open,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
        });
        describe('members', () => {
            describe('is not an array', () => {
                it('undefined', () => {
                    const members = undefined;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    const members = null;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members
                    });
                    expect(error).toBeTruthy();
                });
                it('different type', () => {
                    const members = 'string';
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members
                    });
                    expect(error).toBeTruthy();
                });
                it('object', () => {
                    const members = {};
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members
                    });
                    expect(error).toBeTruthy();
                });
            });
            describe('array contents', () => {
                describe('don\'t have required format', () => {
                    describe('userId', () => {
                        describe('is not a number', () => {
                            it('undefined', () => {
                                userId1 = undefined;
                                const { error } = validateEdit({
                                    name,
                                    deadline,
                                    open,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('null', () => {
                                userId1 = null;
                                const { error } = validateEdit({
                                    name,
                                    deadline,
                                    open,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('different type', () => {
                                userId1 = 'string';
                                const { error } = validateEdit({
                                    name,
                                    deadline,
                                    open,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                        });
                        it('is less than 0', () => {
                            userId1 = -1;
                            const { error } = validateEdit({
                                name,
                                deadline,
                                open,
                                responsibleUserId,
                                members: [
                                    {
                                        userId: userId1,
                                        roleIds: roleIds1
                                    }
                                ]
                            });
                            expect(error).toBeTruthy();
                        });
                        it('is not specified', () => {
                            const { error } = validateEdit({
                                name,
                                deadline,
                                open,
                                responsibleUserId,
                                members: [
                                    {
                                        roleIds: roleIds1
                                    }
                                ]
                            });
                            expect(error).toBeTruthy();
                        });
                    });
                    describe('roleIds', () => {
                        describe('is not an array', () => {
                            it('undefined', () => {
                                roleIds1 = undefined;
                                const { error } = validateEdit({
                                    name,
                                    deadline,
                                    open,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('null', () => {
                                roleIds1 = null;
                                const { error } = validateEdit({
                                    name,
                                    deadline,
                                    open,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('different type', () => {
                                roleIds1 = 'string';
                                const { error } = validateEdit({
                                    name,
                                    deadline,
                                    open,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('object', () => {
                                roleIds1 = {};
                                const { error } = validateEdit({
                                    name,
                                    deadline,
                                    open,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: roleIds1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                        });
                        describe('array contents don\'t have required format', () => {
                            describe('is not a number', () => {
                                it('undefined', () => {
                                    const role = undefined;
                                    const { error } = validateEdit({
                                        name,
                                        deadline,
                                        open,
                                        responsibleUserId,
                                        members: [
                                            {
                                                userId: userId1,
                                                roleIds: [role]
                                            }
                                        ]
                                    });
                                    expect(error).toBeTruthy();
                                });
                                it('null', () => {
                                    const role = null;
                                    const { error } = validateEdit({
                                        name,
                                        deadline,
                                        open,
                                        responsibleUserId,
                                        members: [
                                            {
                                                userId: userId1,
                                                roleIds: [role]
                                            }
                                        ]
                                    });
                                    expect(error).toBeTruthy();
                                });
                                it('different type', () => {
                                    const role = 'string';
                                    const { error } = validateEdit({
                                        name,
                                        deadline,
                                        open,
                                        responsibleUserId,
                                        members: [
                                            {
                                                userId: userId1,
                                                roleIds: [role]
                                            }
                                        ]
                                    });
                                    expect(error).toBeTruthy();
                                });
                            });
                            it('is less than 0', () => {
                                const role = -1;
                                const { error } = validateEdit({
                                    name,
                                    deadline,
                                    open,
                                    responsibleUserId,
                                    members: [
                                        {
                                            userId: userId1,
                                            roleIds: [role]
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                            it('is not unique', () => {
                                const roleIds = [1, 1, 2];
                                const { error } = validateEdit({
                                    name,
                                    deadline,
                                    open,
                                    responsibleUserId,
                                    members: [
                                        {
                                            roleIds,
                                            userId: userId1
                                        }
                                    ]
                                });
                                expect(error).toBeTruthy();
                            });
                        });
                        it('is not passed', () => {
                            const { error } = validateEdit({
                                name,
                                deadline,
                                open,
                                responsibleUserId,
                                members: [
                                    {
                                        userId: userId1
                                    }
                                ]
                            });
                            expect(error).toBeTruthy();
                        });
                        it('is empty', () => {
                            const { error } = validateEdit({
                                name,
                                deadline,
                                open,
                                responsibleUserId,
                                members: [
                                    {
                                        userId: userId1,
                                        roleIds: []
                                    }
                                ]
                            });
                            expect(error).toBeTruthy();
                        });
                    });
                });
                it('are not unique by the userId property', () => {
                    userId1 = userId2 = 1;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is not passed', () => {
                const { error } = validateEdit({
                    name,
                    deadline,
                    open,
                    responsibleUserId
                });
                expect(error).toBeTruthy();
            });
        });
        describe('open', () => {
            describe('is not a boolean', () => {
                it('undefined', () => {
                    open = undefined;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('null', () => {
                    open = null;
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
                it('different type', () => {
                    open = 'string';
                    const { error } = validateEdit({
                        name,
                        deadline,
                        open,
                        responsibleUserId,
                        members: [
                            {
                                userId: userId1,
                                roleIds: roleIds1
                            },
                            {
                                userId: userId2,
                                roleIds: roleIds2
                            }
                        ]
                    });
                    expect(error).toBeTruthy();
                });
            });
            it('is not specified', () => {
                const { error } = validateEdit({
                    name,
                    deadline,
                    responsibleUserId,
                    members: [
                        {
                            userId: userId1,
                            roleIds: roleIds1
                        },
                        {
                            userId: userId2,
                            roleIds: roleIds2
                        }
                    ]
                });
                expect(error).toBeTruthy();
            });
        });
    });
    describe('should return null error if', () => {
        it('members was specified', () => {
            const { error } = validateEdit({
                name,
                deadline,
                open,
                responsibleUserId,
                members: [
                    {
                        userId: userId1,
                        roleIds: roleIds1
                    },
                    {
                        userId: userId2,
                        roleIds: roleIds2
                    }
                ]
            });
            expect(error).toBeNull();
        });
        it('members was not specified', () => {
            const { error } = validateEdit({
                name,
                deadline,
                open,
                responsibleUserId,
                members: []
            });
            expect(error).toBeNull();
        });
    });
});
