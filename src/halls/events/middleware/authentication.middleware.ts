import { NextFunction } from 'express';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { WsException } from '@nestjs/websockets';

export function gatewayAuthentication(
  jwtService: JwtService,
  authService: AuthService,
) {
  return async (client: Socket, next: NextFunction) => {
    try {
      const cookie = client.handshake.headers?.cookie;

      if (cookie) {
        const { access_token } = parse(cookie);
        const payload = await jwtService.verifyAsync(access_token);
        const user = await authService.getUser(payload.username);

        if (user) {
          client['user'] = user;
          return next();
        }
      }

      throw new WsException('Authentication failed');
    } catch (err) {
      next(err);
    }
  };
}
