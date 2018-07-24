import * as Joi from 'joi';

export const validate = (user: any): Joi.ValidationResult<any> => {
    // TODO: Temporarily serves both as login and register validator
    // in the future register should have separate validator
    const schema = {
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
};
