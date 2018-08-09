import * as Joi from 'joi';

interface Role {
    name: string;
}

const schema = {
    name: Joi.string().max(100).required()
};

export const validate = (role: any): Joi.ValidationResult<Role> => {
    return Joi.validate(role, schema);
};
