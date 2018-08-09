import * as Joi from 'joi';

interface RoleCreate {
    name: string;
}

const createSchema = {
    name: Joi.string().max(100).required()
};

export const validateCreate = (role: any): Joi.ValidationResult<RoleCreate> => {
    return Joi.validate(role, createSchema);
};
