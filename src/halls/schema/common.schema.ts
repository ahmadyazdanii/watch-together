import * as Joi from 'joi';

export const movieUrlSchema = Joi.string().trim().uri().max(512);
