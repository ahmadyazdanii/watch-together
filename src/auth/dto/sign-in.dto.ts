import { OmitType } from '@nestjs/mapped-types';
import { SignUpDTO } from './sign-up.dto';

export class SignInDTO extends OmitType(SignUpDTO, ['full_name']) {}
