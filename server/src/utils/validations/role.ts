import * as Joi from 'joi';
import { IRole } from '../types/role';

const schema = {
    name: Joi.string().max(100).required()
};

export const validate = (role: any): Joi.ValidationResult<IRole> => {
    return Joi.validate(role, schema);
};
