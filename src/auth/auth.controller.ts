import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { ValidationSchema } from '@common/decorator/validation-schema.decorator';
import { signUpSchema } from './schema/sign-up.schema';
import { signInSchema } from './schema/sign-in.schema';
import { SignInDTO } from './dto/sign-in.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ValidationSchema(signUpSchema)
  async signUp(
    @Body() user: SignUpDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const [userInstance, jwtToken] = await this.authService.signUp(user);

    response.cookie('access_token', jwtToken);

    return userInstance;
  }

  @Post('/signin')
  @HttpCode(200)
  @ValidationSchema(signInSchema)
  async signIn(
    @Body() { email_address, password }: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const [userInstance, jwtToken] = await this.authService.signIn(
      email_address,
      password,
    );

    response.cookie('access_token', jwtToken);

    return userInstance;
  }
}
