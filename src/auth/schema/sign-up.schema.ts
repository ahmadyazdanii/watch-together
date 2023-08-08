import * as Joi from 'joi';
import { SignUpDTO } from '../dto/sign-up.dto';
import { fullNameSchema, emailSchema, passwordSchema } from './common.schema';

export const signUpSchema = Joi.object<SignUpDTO>({
  full_name: fullNameSchema,
  email_address: emailSchema,
  password: passwordSchema,
}).options({ presence: 'required' });
