import * as Joi from 'joi';

interface User {
    email: string;
    password: string;
    admin?: boolean;
}

export const validate = (user: any): Joi.ValidationResult<User> => {
    // TODO: Temporarily serves both as login and register validator
    // in the future register should have separate validator
    // TODO: split login and register validation
    // TODO: add tests for admin property
    const schema = {
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(5).max(255).required(),
        admin: Joi.boolean()
    };
    return Joi.validate(user, schema);
};
