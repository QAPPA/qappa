import * as Joi from 'joi';

interface User {
    email: string;
    password: string;
}

interface UserRegister extends User {
    admin?: boolean;
}

const userSchema = {
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(255).required()
};

const userRegisterSchema = {
    ...userSchema,
    admin: Joi.boolean()
};

export const validateLogin = (user: any): Joi.ValidationResult<User> => {
    return Joi.validate(user, userSchema);
};

export const validateRegister = (user: any): Joi.ValidationResult<UserRegister> => {
    return Joi.validate(user, userRegisterSchema);
};
