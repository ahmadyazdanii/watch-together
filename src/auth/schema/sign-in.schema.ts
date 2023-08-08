import * as Joi from 'joi';
import { SignInDTO } from '../dto/sign-in.dto';
import { emailSchema, passwordSchema } from './common.schema';

export const signInSchema = Joi.object<SignInDTO>({
  email_address: emailSchema,
  password: passwordSchema,
}).options({ presence: 'required' });
