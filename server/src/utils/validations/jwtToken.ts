import * as Joi from 'joi';

interface JWTPayload {
    id: number;
    admin: boolean;
}

export const validate = (payload: any): Joi.ValidationResult<JWTPayload> => {
    const schema = {
        id: Joi.number().min(0).required(),
        admin: Joi.boolean().required()
    };
    // JWT token usually contains other fields like "iat", allow them
    return Joi.validate(payload, schema, { allowUnknown: true });
};
