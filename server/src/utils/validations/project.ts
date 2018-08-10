import * as Joi from 'joi';
import { IProjectCreate, IProjectEdit } from '../types/project';

const projectCreateSchema = {
    name: Joi.string().max(100).required(),
    deadline: Joi.date().min('now').required(),
    responsibleUserId: Joi.number().min(0).required(),
    users: Joi.array().items({
        userId: Joi.number().min(0).required(),
        roleIds: Joi.array().items(
            Joi.number().min(0)
        ).min(1).unique().required()
    }).min(1).unique('userId').required()
};

const projectEditSchema = {
    ...projectCreateSchema,
    open: Joi.boolean().required()
};

export const validateCreate = (project: any): Joi.ValidationResult<IProjectCreate> => {
    return Joi.validate(project, projectCreateSchema);
};

export const validateEdit = (project: any): Joi.ValidationResult<IProjectEdit> => {
    return Joi.validate(project, projectEditSchema);
};
