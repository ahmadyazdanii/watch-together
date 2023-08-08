import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';
import { SignUpDTO } from './dto/sign-up.dto';
import { compare, compareSync, hash } from 'bcryptjs';
import { SALT_LENGTH } from './auth.constants';
import { SignInDTO } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseProvider,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(newUser: SignUpDTO) {
    const userInstance = await this.database.user.findUnique({
      select: {
        id: true,
      },
      where: {
        email_address: newUser.email_address,
      },
    });

    if (userInstance) {
      throw new UnprocessableEntityException(
        'The email address already in use',
      );
    }

    return await this.database.user.create({
      select: {
        id: true,
        email_address: true,
        full_name: true,
        createdAt: true,
      },
      data: {
        ...newUser,
        password: await hash(newUser.password, SALT_LENGTH),
      },
    });
  }

  async signIn(email_address: string, password: string) {
    const user = await this.database.user.findUnique({
      select: {
        id: true,
        full_name: true,
        email_address: true,
        password: true,
      },
      where: {
        email_address,
      },
    });

    if (user && compareSync(password, user.password)) {
      return [
        omit(user, ['password']),
        this.jwtService.sign({ id: user.id }, { expiresIn: '1D' }),
      ];
    } else {
      throw new UnauthorizedException(
        'The Email address or password is incorrect',
      );
    }
  }
}
