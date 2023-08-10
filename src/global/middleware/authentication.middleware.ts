import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.access_token;

      if (token) {
        const payload = await this.jwtService.verifyAsync(token);
        const user = await this.authService.getUser(payload.username);

        if (user) {
          req['user'] = user;
          return next();
        }
      }

      throw new UnauthorizedException();
    } catch (err) {
      next(err);
    }
  }
}
