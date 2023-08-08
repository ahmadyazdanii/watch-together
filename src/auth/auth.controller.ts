import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { ValidationSchema } from '@global/decorator/validation-schema.decorator';
import { signUpSchema } from './schema/sign-up.schema';
import { signInSchema } from './schema/sign-in.schema';
import { SignInDTO } from './dto/sign-in.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ValidationSchema(signUpSchema)
  signUp(@Body() user: SignUpDTO) {
    return this.authService.signUp(user);
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
