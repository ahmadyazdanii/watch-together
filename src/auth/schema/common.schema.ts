import * as Joi from 'joi';

export const emailSchema = Joi.string().trim().email();
export const fullNameSchema = Joi.string().trim().max(191);
export const passwordSchema = Joi.string().trim().min(8).max(191);
