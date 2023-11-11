import { UserRole } from '@auth/types/user.type';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : context.switchToWs().getClient();

    const currentUser = request['user'];
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    return false;
  }
}
