import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: keyof Prisma.UserGetPayload<false>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return data ? request['user'][data] : request['user'];
  },
);
