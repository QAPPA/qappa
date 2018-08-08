import * as Joi from 'joi';

interface ProjectCreateUser {
    userId: number;
    roleIds: number[];
}

interface ProjectCreate {
    name: string;
    deadline: string;
    responsibleUserId: number;
    users: ProjectCreateUser[];
}

interface ProjectEdit extends ProjectCreate {
    id: number;
    open: boolean;
}

const projectCreateSchema = {
    name: Joi.string().max(100).required(),
    deadline: Joi.date().min('now').required(),
    responsibleUserId: Joi.number().min(0).required(),
    users: Joi.array().items({
        userId: Joi.number().min(0).required(),
        roleIds: Joi.array().items(
            Joi.number().min(0)
        ).min(1).required()
    }).min(1).required()
};

const projectEditSchema = {
    ...projectCreateSchema,
    id: Joi.number().min(0).required(),
    open: Joi.boolean().required()
};

export const validateCreate = (project: any): Joi.ValidationResult<ProjectCreate> => {
    return Joi.validate(project, projectCreateSchema);
};

export const validateEdit = (project: any): Joi.ValidationResult<ProjectEdit> => {
    return Joi.validate(project, projectEditSchema);
};
